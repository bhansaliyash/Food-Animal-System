import React from 'react';
import './App.css';

interface MyProps {
    searchValue:string
};

interface Movement{
  movement_id : number,
  company : string,
  origin_premise_id : string,
  dest_premise_id : string,
  species : string, 
  shipment_start_date : Date,
  items_moved : number,
  reason : string
}

interface MyState {
  status: string;
  data: Movement[];
};

class MovementTable extends React.Component<MyProps,MyState>{
  constructor(props : MyProps){
    super(props);
    this.state = {
      status: "Fetching records..",
      data: []
    };
  }

  async componentDidMount() {
    try {
        const res =  await fetch("http://localhost:8000/movement/");
        const temp =  await res.json()
        
        this.setState({
            status : temp["status"],
            data: temp["data"]
        });

    } catch (e) {
        console.log(e);
    }
  }

  render(): React.ReactNode {

    if(this.state.status=="error"){
      return(
        <h1>No data available</h1>
      )
    }
    else{
      return(
        <div>
            <table className="pure-table pure-table-bordered">
            <thead>
                <tr>
                <th>Movement Id</th>
                <th>Company</th>
                <th>Origin Premise</th>
                <th>Destination Premise</th>
                <th>Species</th>
                <th>Shipment Start Date</th>
                <th>Items Moved</th>
                <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.data.map((data,index) => {
                    return (
                        <tr key={data.movement_id}>
                        <td>{data.movement_id}</td>
                        <td>{data.company}</td>
                        <td>{data.origin_premise_id}</td>
                        <td>{data.dest_premise_id}</td>
                        <td>{data.species}</td>
                        <td>{data.shipment_start_date.toString()}</td>
                        <td>{data.items_moved}</td>
                        <td>{data.reason}</td>
                        </tr>
                    )
                    })
                }
            </tbody>
            </table>
          
        </div>
      )
    }
  }
}

export default MovementTable;
