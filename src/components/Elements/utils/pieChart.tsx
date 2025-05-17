import { fetchAllClients } from '@/api/master/clients';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell} from 'recharts';
import { ResponsiveContainer,Tooltip } from 'recharts'; 
const Piechart = () => {
    const [clientCount,setClientCount] = useState(0);

    useEffect(() => {
        fetchAllClients().then((data) => {
            setClientCount(data.totalElements)
        })
    }, [])

    const data = [
        { name: "Active Clients", value: clientCount, color: "#3b82f6" },
        {name:"Inactive Clients",value:0,color:"#d1cece"},
    ]
    return (
        <div>
            <div>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Tooltip contentStyle={{ background: "#3b82f6", borderRadius: "5px" }} itemStyle={{color:"whitesmoke"}} />
                        <Pie
                            data={data}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Piechart