import React, { useState, useEffect } from 'react';
import type { RegisteredMember } from '../../types/RegisteredMember';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import api from '../../api/axios';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import AdminPage from './AdminPage';
import { Input } from './Input';
import { FaFileCsv, FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import { TbFileTypeSql } from 'react-icons/tb';
import type { User } from '../../types/User';
import Modal from './Modal';
import Select from './Select';
import pushToast from '../../lib/toast';

interface TableListProps {
  onRefresh?: () => void;
}

type NewUser = {
  name: string;
  role: string;
}

type Errors = {
  name: string;
  role: string;
}

const roleOptions = [
  {
    id: "admin",
    name: "Admin",
  },
    {
    id: "ons",
    name: "Onsite",
  },
    {
    id: "pre",
    name: "Pre Reg",
  },
];

const AccountsTableList: React.FC<TableListProps> = ({ onRefresh }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<User[]>([]);
  const [selectedItems, setSelectedItems] = useState<(number | undefined)[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [newUser, setNewUser] = React.useState<NewUser>({
    name: "",
    role: "",
  });

  const [errors, setErrors] = React.useState<Errors | null>({
    name: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setErrors(null);

    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const navigate = useNavigate();

  const fetchData = async (page = 1, searchQuery = '') => {
    setLoading(true);

    try {
      const res = await api.get(`/accounts?page=${page}&search=${encodeURIComponent(searchQuery)}`);
      console.log(res);
      setList(res.data.data.data);
      setCurrentPage(res.data.data.current_page);
      setLastPage(res.data.data.last_page);
      setSelectedItems([]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, search);
  }, [currentPage, search]);

  const toggleSelect = (id: number | undefined) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === list.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(list.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await api.post('/account/batch-delete', { ids: selectedItems });
      fetchData(currentPage, search); // refetch after delete
      onRefresh?.();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const toggleDropdown = (id: number | undefined) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
  };

  const handleAction = (type: string, member: User) => {
    if (type === 'edit') {
      navigate(`${member.id}`);
    }
    setOpenDropdownId(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearch(searchInput);
  };

  if (initialLoading) {
    return (
      <AdminPage className='flex items-center justify-center min-h-[80vh]'>
        <span>Loading...</span>
      </AdminPage>
    );
  }

  const handleDownload = async (type: 'csv' | 'xlsx' | 'pdf' | 'sql') => {
    const url = {
      csv: 'export/csv',
      xlsx: 'export/xlsx',
      pdf: 'export/pdf',
      sql: 'export/sql'
    }[type];

    try {
      const response = await api.get(`/${url}`, {
        responseType: 'blob', // Important!
      });

      // Create a blob from the response
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = URL.createObjectURL(blob);

      // Create a link element and simulate click
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Set the filename from content-disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'registered_members.' + type;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) fileName = match[1];
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); // Clean up
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file.');
    }
  };

  const handleCreateAccount = async () => {
    setErrors(null);
    setLoading(true);

    try {
      const res = await api.post('/account', newUser);
      console.log(res);
      pushToast("Created Successfully");
      setNewUser({
        name: "",
        role: "",
      });
      fetchData();
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className='flex flex-col bg-white z-10 items-center gap-2 fixed top-16 p-4 right-0 left-0 md:left-72 lg:left-72'>
        <div className='flex items-center gap-2 w-full relative'>
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className='text-sm pe-10'
            placeholder="Search by name, book, or account number"
          />
          <IoClose className='text-xl cursor-pointer absolute right-24' onClick={() => {
            setSearchInput("");
            setSearch("");
          }} />
          <Button className="bg-primary text-white" type="submit" disabled={loading}>Search</Button>
        </div>
        <div className='flex items-center gap-2 w-full justify-between mt-2'>
          <div className='flex items-center gap-2'>
            {/* <Button className='bg-primary text-white' onClick={() => navigate('/admin/member-registration')}>
              <IoAdd className='text-lg' />
            </Button> */}

            <Modal title='Add User' buttonClassName='bg-primary text-white' label={<IoAdd className='text-lg' />}>
              <div className='flex flex-col gap-4'>
                <Input 
                  id='name'
                  name='name'
                  label='Username'
                  placeholder='Username'
                  onChange={handleChange}
                  value={newUser.name}
                  loading={loading}
                  disabled={loading}
                  error={errors?.name}
                />
                <Select
                  id='role'
                  name='role'
                  label='Role'
                  placeholder='Please Select a Role'
                  options={roleOptions} 
                  onChange={handleChange} 
                  value={newUser.role}
                  loading={loading}
                  disabled={loading}
                  error={errors?.role}
                />

                <Button
                  className='bg-primary text-white'
                  onClick={handleCreateAccount}
                  disabled={loading || !newUser.name || !newUser.role}
                  loading={loading}
                >
                  Create
                </Button>
              </div>
            </Modal>

            <Button
              className='bg-red-500 text-white'
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
            >
              <IoTrash className='text-lg' />
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            {/* <Button className='bg-red-500 text-white' onClick={() => handleDownload('pdf')}>
              <FaFilePdf className='text-lg' />
            </Button>
            <Button className='bg-blue-500 text-white' onClick={() => handleDownload('csv')}>
              <FaFileCsv className='text-lg' />
            </Button>
            <Button className='bg-green-500 text-white' onClick={() => handleDownload('xlsx')}>
              <FaFileExcel className='text-lg' />
            </Button>
            <Button className='bg-pink-500 text-white' onClick={() => handleDownload('sql')}>
              <TbFileTypeSql className='text-xl' />
            </Button> */}
          </div>
        </div>
      </form>


      <div className='border mt-[120px] -z-10'>
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              <td className="px-4 py-4 text-left text-xs font-medium uppercase">
                <input
                  className='w-4 h-4'
                  type="checkbox"
                  checked={selectedItems.length === list.length && list.length > 0}
                  onChange={toggleSelectAll}
                />
              </td>
              <td className="px-2 py-4 text-left text-xs font-medium uppercase">Name</td>
              <td className="px-2 py-4 text-left text-xs font-medium uppercase">Role</td>
              <td className="px-2 py-4 text-left text-xs font-medium uppercase">Status</td>
              {/* <td className="px-2 py-4 text-left text-xs font-medium uppercase">Action</td> */}
            </tr>
          </thead>
          <tbody className='text-xs'>
            {list.map(item => (
              <tr key={item.id} className="border-t hover:bg-gray-50 relative">
                <td className="px-4 py-4">
                  <input
                    className='w-4 h-4'
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="px-2 py-4 text-xs">{item.name}</td>
                <td className="px-2 py-4 text-xs">{item.role}</td>
                <td className="px-2 py-4 text-xs">{item.status}</td>
                {/* <td className="px-2 py-4 relative">
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <HiOutlineDotsHorizontal className='text-lg' />
                  </button>
                  {openDropdownId === item.id && (
                    <div className="absolute right-2 mt-2 w-28 bg-white border rounded-md shadow-md z-10">
                      <button
                        onClick={() => handleAction('edit', item)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td> */}
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Page {currentPage} of {lastPage}</span>
        <div className="flex gap-2">
          <Button
            className='bg-primary text-white'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Prev
          </Button>
          <Button
            className='bg-primary text-white'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountsTableList;
