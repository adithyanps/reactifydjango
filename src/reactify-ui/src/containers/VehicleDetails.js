import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VehicleDetails extends Component{
  state = {
    slug:null,
    VehicleData: null
  }
  componentDidMount(){
    this.setState({
      slug:null,
      VehicleData:null,

    })
    if (this.props.match){
      const {slug} = this.props.match.params
      this.setState({
        slug:slug,
        doneLoading:false,

      },console.log(this.state.slug))
      this.loadVehicleForm(slug)
    }
  }
  loadVehicleForm = (slug) => {
    const endpoint = `/vehicle/${slug}/`
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(endpoint,lookupOptions)
    .then((response) => {
      if (response.status == 404 ) {
        console.log('page not found')
      }
      return response.json()
    }).then((responseData)=>{
      if (responseData.detail){
        thisComp.setState({
          doneLoading: true,
          VehicleData: null
        })
      } else {
        thisComp.setState({
          doneLoading: true,
          VehicleData:responseData
        })
      }
    }).catch((error) => {
      console.log("error",error)
    })
  }
  render(){
    const {slug,doneLoading} = this.state
    const VehicleData = this.VehicleData
    console.log(this.state.slug)
    return(
      <p>{(doneLoading === true) ? <div>
        {VehicleData === null ? "not found":
      <div>
      {VehicleData.register_no}
     {VehicleData.value}
      <p className='lead'><Link maintainScrollPosition={false} to={{
              pathname:`/saved`,
                    state:{fromDashboard:false}
                  }}>view more</Link></p>
      </div>
      }
      </div> : "...loading"}</p>
    )
  }
}
export default VehicleDetails
