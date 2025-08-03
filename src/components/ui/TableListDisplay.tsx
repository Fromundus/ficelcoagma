import { format } from 'date-fns';
import type { RegisteredMember } from '../../types/RegisteredMember';

type Props = {
    list: RegisteredMember[]
}

const TableDisplay = ({ list }: Props) => {
  return (
    <div className="border w-full">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-100">
          <tr>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Account Number</td>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Book</td>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Name</td>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Address</td>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Date & Time</td>
            <td className="px-2 py-4 text-left text-xs font-medium uppercase">Type of Registration</td>
          </tr>
        </thead>
        <tbody className="text-xs">
          {list.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-2 py-4 text-xs">{item.account_number}</td>
              <td className="px-2 py-4 text-xs">{item.book}</td>
              <td className="px-2 py-4 text-xs">{item.name}</td>
              <td className="px-2 py-4 text-xs">{item.address}</td>
              <td className="px-2 py-4 text-xs">{item.created_at ? format(new Date(item.created_at), 'PPpp') : '—'}</td>
              <td className="px-2 py-4 text-xs">{item.registration_method}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
