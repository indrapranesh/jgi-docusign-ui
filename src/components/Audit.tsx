/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { APIService } from '../helpers/ApiService';
import { API_URL, BASE_URL } from '../constants/url.constants';
import history from '../history';
import routes from '../constants/routes.json';

function Audit() {

    const [audit, setAudit] = useState([]);

    const expandedRowRender = (record: any, index: number) => {

        const openEnvelope = (record: any) => {
            history.push(`${routes.REVIEWS}/${record.id}`)
        }
        
        const columns = [
            { title: 'Review No', dataIndex: 'index', key: 'index' },
            { title: 'Created Date', dataIndex: 'startDate', key: 'startDate' },
            { title: 'Action', key: 'operation', render: (_: any, record: any) => <a onClick={() => openEnvelope(record)}>View Envelope Status</a> },
        ];

        const data: any = [];
        (record.reviews as Array<any>).forEach((review, index) => {
            data.push({
                id: review.id,
                index: index+1,
                startDate: review.createdAt,
            })
        })
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: 'Audit #', dataIndex: 'index', key: 'index' },
        { title: 'Initial Version', dataIndex: 'initialVersion', key: 'initialVersion' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Created Date', dataIndex: 'startDate', key: 'startDate' },
    ];


    const loadAudits = async() => {
        let res: Array<any> = await APIService.get(BASE_URL, API_URL.GET_AUDITS);
        let audits: any = [];
        res.forEach((audit, index) => {
            console.log(audit)
            let data = {
                index: index+1,
                startDate: audit.createdAt,
                initialVersion: audit.initialVersion,
                status: audit.isCompleted ? 'Completed' : 'Active',
                reviews: audit.reviews
            }
            console.log(data)
            audits.push(data);
        })
        setAudit(audits);
    }

    useEffect(() => {
        loadAudits();  
    }, [])

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={audit}
    />
  );
}

export default Audit;
