import React from 'react'
import api from '../api/axios';
import Card from './ui/Card';
import pushToast from '../lib/toast';
import Button from './ui/Button';
import { format } from 'date-fns';

type Settings = {
    online: string;
    prereg: string;
    onsite: string;
}

type Log = {
    id: number;
    user_id: number;
    name: string;
    fullname: string;
    description: string;
    created_at: string;
}

const SettingsComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [updateLoading, setUpdateLoading] = React.useState<boolean>(false);
    const [logs, setLogs] = React.useState<Log[]>([]);
    const [settings, setSettings] = React.useState<Settings>({
        online: "",
        prereg: "",
        onsite: "",
    });

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await api.get('/settings');
            console.log(res);
            setSettings(res.data.data);
            setLogs(res.data.logs);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleAddSettings = async () => {
        setLoading(true);
        try {
            const res = await api.post('/settings');
            console.log(res);
            setSettings(res.data.data);
            setLoading(false);
            pushToast(res.data.message);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            pushToast(err.response.data.message);
        }
    }

    const handleUpdate = async (status: string, field: string) => {
        setUpdateLoading(true);
        const data = {
            status: status === "active" ? "inactive" : "active",
            field: field,
        }

        try {
            console.log(data);

            const res = await api.put('/settings', data);
            console.log(res);
            setSettings(res.data.data);
            setLogs(res.data.logs);
            pushToast(res.data.message);
            setUpdateLoading(false);
        } catch (err: any) {
            console.log(err);
            pushToast(err.response.data.message);
            setUpdateLoading(false);
        }
    }

    React.useEffect(() => {
        fetchSettings();
    }, []);

    const renderLogs = logs?.map((item: Log) => {
        return (
            <div key={item.id}>
                <span className='text-xs'><span className='font-medium'>[{format(new Date(item.created_at), 'PPpp')}]</span> {item.fullname} {item.description}</span>
            </div>
        )
    });

    if(loading){
        return (
            <Card className='w-full text-center' childrenClassName='p-6'>
                <span>Loading...</span>
            </Card>
        )
    }


    if(!loading && settings.online === "" && settings.onsite === "" && settings.prereg === ""){
        return (
            <Card className='w-full text-center' childrenClassName='p-6 flex flex-col gap-4 items-center'>
                <span>Settings is not configured yet.</span>
                <Button className='w-fit bg-primary text-white' onClick={handleAddSettings}>
                    Setup Settings
                </Button>
            </Card>
        )
    }

    return (
        <Card className='w-full' childrenClassName='p-6 flex flex-col gap-4 bg-pearl' titleClassName='w-full text-md font-normal' title={
            <div className='grid gap-4 grid-row-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
                <div className='flex items-center gap-4 justify-start sm:justify-center md:justify-center lg:justify-center'>
                    <span>Online:</span>
                    <label
                        htmlFor="online"
                        className={`relative block h-6 w-11 rounded-full transition-colors cursor-pointer [-webkit-tap-highlight-color:_transparent] ${settings.online === "active" ? "bg-primary" : "bg-gray-300"}`}
                        >
                        <input type="checkbox" id="online" className="peer sr-only" onClick={() => !updateLoading && handleUpdate(settings.online, "online")} />

                        <span
                            className={`absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] ${settings.online === "active" ? "start-5" : null}`}
                        ></span>
                    </label>
                </div>

                <div className='flex items-center gap-4 justify-start sm:justify-center md:justify-center lg:justify-center'>
                    <span>Prereg:</span>
                    <label
                        htmlFor="prereg"
                        className={`relative block h-6 w-11 rounded-full transition-colors cursor-pointer [-webkit-tap-highlight-color:_transparent] ${settings.prereg === "active" ? "bg-primary" : "bg-gray-300"}`}
                        >
                        <input type="checkbox" id="prereg" className="peer sr-only" onClick={() => !updateLoading && handleUpdate(settings.prereg, "prereg")} />

                        <span
                            className={`absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] ${settings.prereg === "active" ? "start-5" : null}`}
                        ></span>
                    </label>
                </div>

                <div className='flex items-center gap-4 justify-start sm:justify-center md:justify-center lg:justify-center'>
                    <span>Onsite:</span>
                    <label
                        htmlFor="onsite"
                        className={`relative block h-6 w-11 rounded-full transition-colors cursor-pointer [-webkit-tap-highlight-color:_transparent] ${settings.onsite === "active" ? "bg-primary" : "bg-gray-300"}`}
                        >
                        <input type="checkbox" id="onsite" className="peer sr-only" onClick={() => !updateLoading && handleUpdate(settings.onsite, "onsite")} />

                        <span
                            className={`absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] ${settings.onsite === "active" ? "start-5" : null}`}
                        ></span>
                    </label>
                </div>
            </div>}>
            
            {logs.length && logs.length > 0 && <div className='flex flex-col gap-2'>
                <span className='font-semibold'>Logs</span>
                <div className='flex flex-col'>
                    {renderLogs}
                </div>
            </div>}
        </Card>
    )
}

export default SettingsComponent
