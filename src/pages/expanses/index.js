import BodyFormFilter from "@/components/elements/BodyFormFilter";
import Graphic from "@/components/fragments/Graphic";
import History from "@/components/fragments/History";
import { Col, Row } from "react-bootstrap";
import TesExpanse from "@/components/elements/tesExpanse";
import { useEffect, useState } from "react";
import { getExpanseTotalMonthly } from "@/rest_API/expanses_api";
import Chart from "@/components/elements/Chart";
import Table from "@/components/elements/Table";

const expanses = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filterData, setFilterData] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getExpanseTotalMonthly();
            // data for chart
            const filteredDatasForChart = response.map(({ id, user_id, wallet_id, ...rest }) => rest).map(({ expanses_id, amount }) => ({ category: expanses_id, value: amount }));
            setChartData(filteredDatasForChart);

            // data for table
            const filteredDatasForTable = response.map(({ user_id, createdAt, updatedAt, date_transaction, ...rest }) => ({ ...rest, date_transaction: new Date(date_transaction).toLocaleDateString() }));
            setTableData(filteredDatasForTable);

            // data for filter
            const filteredDatasForFilterFirst = response.map(({ user_id, createdAt, updatedAt, date_transaction, wallet_id, description, id, ...rest }) => ({ ...rest, date_transaction: new Date(date_transaction).toLocaleDateString()})).map(({expanses_id,amount,...rest})=>({category: expanses_id, value: amount,...rest}))
            const newData = filteredDatasForFilterFirst.map(({date_transaction,...rest})=>{
                const month = date_transaction.split("/")[0]
                const year = date_transaction.split("/")[2]
                return {...rest,month,year}
            })
            setFilterData(newData)

        } catch (error) {
            console.error(error);
        }
    };

    const handleDataEdited = () => {
        fetchData();
    };

    return (
        <Row>
            <Col md="8">
                <div>
                    <h1>ini adalah halaman expanses</h1>
                    <TesExpanse onDataAdded={handleDataEdited}>Add Expanse</TesExpanse>
                    <Chart type={"Bar"} title={"Expanse"} color={"red"} datas={chartData}>
                        Expanses by category monthly
                    </Chart>
                </div>
                <div>
                    <Table datas={tableData} onDataDeleted={handleDataEdited} >ini adalah table history</Table>
                </div>

            </Col>
            <Col md="4" style={{ backgroundColor: "grey" }}>
                <BodyFormFilter datas={filterData}/>
            </Col>
        </Row>
    );
};
export default expanses;

