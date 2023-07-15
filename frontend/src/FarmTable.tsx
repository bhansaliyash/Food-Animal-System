import React from 'react';
import './App.css';

interface MyProps {
};

interface Farm{
    premise_id : string,
    name : string,
    address : string,
    city : string,
    state : string,
    postal_code : number,
    longitude: number,
    latitude:number,
    total_population : number
}

interface MyState {
  status: string;
  data: Farm[];
};

class FarmTable extends React.Component<MyProps,MyState>{
  constructor(props : MyProps){
    super(props);
    this.state = {
      status: "Fetching records..",
      data: []
    };
  }

  async componentDidMount() {
    try {
        const res =  await fetch("http://localhost:8000/farm/");
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
                <th>Premise Id</th>
                <th>Farm Name</th>
                <th>Total Population</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.data.map((data,index) => {
                    return (
                        <tr key={data.premise_id}>
                        <td>{data.premise_id}</td>
                        <td>{data.name}</td>
                        <td>{data.total_population}</td>
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

export default FarmTable;
