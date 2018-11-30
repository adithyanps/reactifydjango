import React , { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ViewForm extends Component {

  state = {
    VehicleData:[],
    show : false,

  }

  componentDidMount(){
    this.setState({
      VehicleData:[],

    })
    this.loadVehicleForm()
  }

  loadVehicleForm = () => {
    const endpoint = '/vehicle/'
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(endpoint,lookupOptions)
    .then((response) => {
      return response.json()
    }).then((responseData)=>{
      console.log(responseData)
      thisComp.setState({VehicleData:responseData})
    }).catch((error) => {
      console.log("error",error)
    })
  }
  render(){
    console.log(this.state.VehicleData)
    return(
        <div>
          <h1>saved datas</h1>
          {this.state.VehicleData.length > 0 ? this.state.VehicleData.map(order => (
            <div key={order.id}>
              <form>
                <input value={order.id} />
                <input value={order.brand_name} />
                <input value={order.model_name}/>
                <input value={order.date} />
                <input  value={order.register_no}/>
                <input value={order.value} />

                <button >delete</button>
                <button onClick={ (event,id)=>this.onEdit(event,order.id)}>edit</button>
                <button onClick={this.toggleItemHandler}>view</button>
              </form>
              <Link maintainScrollPosition={false} to={{
                      pathname:`/saved/${order.id}`,
                            state:{fromDashboard:false}
                          }}>view more</Link>
            </div>
          )
        ): <p>there is no saved data</p>}

        </div>
    )
  }
}
export default ViewForm;
