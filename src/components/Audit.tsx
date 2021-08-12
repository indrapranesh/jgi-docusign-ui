/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { APIService } from '../helpers/ApiService';
import { API_URL, BASE_URL } from '../constants/url.constants';
import history from '../history';
import Modal from 'antd/lib/modal/Modal';
import Demo from './CreateReview';
import Publish from './Publish';

function Audit() {

    const [audit, setAudit] = useState([]);
    const [auditId, setAuditId] = useState(0);
    const [reviewModalOpen, setReviewModal] = useState(false);
    const [final, setFinal] = useState(false);
    const [title, setTitle] = useState('');
    const [publishModalOpen, setPublishModal] = useState(false);

    const expandedRowRender = (record: any, index: number) => {

        const openEnvelope = (record: any) => {
            history.push(`audits/review/${record.id}`)
        }
        
        const columns = [
            { title: 'Review', dataIndex: 'index', key: 'index' },
            { title: 'Created Date', dataIndex: 'startDate', key: 'startDate' },
            { title: 'Envelopes', key: 'operation', render: (_: any, record: any) => <Button onClick={() => openEnvelope(record)}>View Envelope Status</Button> },
        ];

        const data: any = [];
        (record.reviews as Array<any>).forEach((review, index) => {
            data.push({
                id: review.id,
                index: review.finalReview ? 'Final Review' : index+1,
                startDate: getDate(review.createdAt),
                key: index
            })
        })
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const createNewReview = (record) => {
        setAuditId(record.id)
        setTitle('Create New Review Cycle')
        setReviewModal(true);
    }

    const createFinalReview = (record) => {
        console.log(record);
        setAuditId(record.id);
        setFinal(true);
        setTitle('Create Final Review')
        setReviewModal(true);
    }

    const getDate = (date) => {
            let readable = new Date(date); 
            let m = readable.getMonth();
            let d = readable.getDate(); 
            let y = readable.getFullYear(); 
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let mlong = months[m];
            return (mlong + " " + d + ", " + y);
    }

    const columns = [
        { title: 'Audit #', dataIndex: 'index', key: 'index' },
        { title: 'Initial Version', dataIndex: 'initialVersion', key: 'initialVersion' },
        { title: 'Status', key: 'status', render: (_: any, record: any) => record.isCompleted ? <Tag color="success">Completed</Tag> : <Tag color="processing">Active</Tag>},
        { title: 'Created Date', dataIndex: 'startDate', key: 'startDate' },
        { title: 'New Review', key: 'new', render: (_: any, record: any) => <Button type="primary" disabled={record.finalReview} onClick={() => createNewReview(record)}>Create New Review</Button> },
        { title: 'Final Review', key: 'final', render: (_: any, record: any) => <Button type="primary" disabled={record.finalReview} onClick={() => createFinalReview(record)}>Create Final Review</Button> },
    ];

    const handleCancel = () => {
        setReviewModal(false);
        setPublishModal(false);
      };


    const loadAudits = async() => {
        let res: Array<any> = await APIService.get(BASE_URL, API_URL.GET_AUDITS);
        let audits: any = [];
        res.forEach((audit, index) => {
            console.log(audit)
            let data = {
                index: index+1,
                startDate: getDate(audit.createdAt),
                initialVersion: audit.initialVersion,
                isCompleted: audit.isCompleted,
                reviews: audit.reviews,
                key: index,
                id: audit.id,
                finalReview: audit.finalReview
            }
            console.log(data)
            audits.push(data);
        })
        setAudit(audits);
    }

    const createAudit = async() =>  {
        await APIService.post(`${BASE_URL}`, API_URL.CREATE_AUDIT, {});
        loadAudits();
    }

    const updateMap  = async() => {
        setPublishModal(true);
    }

    useEffect(() => {
        loadAudits();  
    }, [])

  return (
    <>
        <div className="flex justify-end mb-5">
            <Button type="primary" shape="round" size="large" onClick={createAudit}>
                            Create New Audit
                        </Button>
                        <Button className="ml-3" type="primary" shape="round" size="large" onClick={updateMap}>
                            Update Map Version
                        </Button>
        </div>
        <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={audit}
        />
        <Modal
            width={'50%'}
            visible={reviewModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <Demo auditId={auditId} title={title} final={final} loadAudits={loadAudits} closeModal={handleCancel} />
        </Modal>
        <Modal
            width={'50%'}
            visible={publishModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <Publish closeModal={handleCancel} />
        </Modal>
    </>
  );
}

export default Audit;
