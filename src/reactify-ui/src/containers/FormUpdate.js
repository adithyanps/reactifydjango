import React , { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies';
import moment from 'moment';
import { Route, Redirect } from 'react-router'


class FormUpdate extends Component {
  constructor(props){
    super(props)
    this.vehicleRegisterRef = React.createRef()
    this.vehiclePriceRef = React.createRef()
  }
  state = {
    brandData:[],
    modelData:[],
    register_no:null,
    price:null,
    date:null,
    selectedView:'',
    errors:{},
    brand_id:[],
    model_id:[],
    text:'',
    vehicle_id:null,
  }
    componentDidMount(){
      const VehicleData = this.props.VehicleData
      const filterItem = this.props.filterItem
      console.log("updatefilter",filterItem)
      filterItem.map((item)=>{
        console.log("updatefilter-registr",item.register_no)
        this.setState({
          register_no:item.register_no,
          price:item.value,
          date:item.date
        })
      })
      console.log("didmount rgstr",VehicleData.register_no)
      console.log("didmount new_id",this.state.new_id)
      // if (VehicleData !== undefined){
      //   this.setState({
      //     register_no: VehicleData.register_no,
      //     price:VehicleData.value,
      //     date:moment(VehicleData.date).format('YYYY-MM-DD')
      //   })
      // } else {
      //   this.setState({
      //     model_id: false,
      //     brand_id:null,
      //     register_no:VehicleData.register_no,
      //     price:null,
      //     date:moment(new Date()).format('YYYY-MM-DD')
      //   })
      // }
      // this.vehicleRegisterRef.current.focus()
    }
    // updateForm(dataContent) {
    //   let new_id = this.props.new_id
    //   console.log("update sample new_id",new_id)
    //   const VehicleData  =this.props.VehicleData
    //   const endpoint = `/vehicle/${new_id}/`
    //   const csrfToken = cookie.load('csrftoken')
  	// 	let thisComp = this
    //   if (csrfToken !== undefined) {
    //     let lookupOptions = {
    //       method :"PUT",
    //       headers : {
    //         'Content-Type': 'application/json',
    //          'X-CSRFToken':csrfToken
    //       },
    //       body :JSON.stringify(dataContent),
    //       credentials:'include'
    //     }
    //     fetch(endpoint,lookupOptions)
    //     .then((response) => {
    //       return response.json()
    //     }).then((responseData)=>{
    //       console.log(responseData)
    //       // if (thisComp.props.newPostItemCreated) {
    //       //   thisComp.props.newPostItemCreated(responseData)
    //       // }
    //       thisComp.clearForm()
    //     }).catch((error)=> {
    //       console.log('error',error)
    //       alert("pls try again later")
    //     })
    //   }
    // }
    clearForm = () => {
      this.postCreateForm.reset();
    }
    clearFormRefs = () => {
      this.postTitleRef.current=''
      this.postContentRef.current=''
    }
    handleInputChange = (event) => {
      event.preventDefault();
      console.log(event.target.name,event.target.value)
      // this.setState({
      //   [event.target.name] : event.target.value
      // })
      let key = event.target.name
      let  value = event.target.value
      if (key === 'register_no') {
        if (value.length > 12 ) {
          alert("too long")
        }
      }
    this.setState({[key]:value})
    }
    render(){
      const {date,register_no,price,} = this.state;
      console.log(this.props.register_no)
      return(
        <div>
        <form onSubmit={this.props.handleSubmitHandler} ref={(el) => this.vehicleCreateForm = el}>
          <div className='form-group'>
            <label for='register_no'>register-no</label>
            <input
              type='text'
              id='register_no'
              name='register_no'
              ref={this.vehicleRegisterRef}
              value={register_no}
              className='form-control'
              placeholder='enter register-number here---'
              onChange={this.handleInputChange}
              required />
            </div>
            <div className='form-group'>
              <label for='price'>price</label>
              <input
                type='text'
                id='price'
                name='price'
                ref={this.vehiclePriceRef}
                className='form-control'
                value={price}
                placeholder='enter price here---'
                onChange={this.handleInputChange}
                required />
              </div>
              <div className='form-group'>
                <label for='publish'>Publish Date</label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  value={date}
                  className='form-control'
                  onChange={this.handleInputChange}
                  required='required'/>
              </div>
              <div>
                <select
                  onChange={this.props.selectBrandHandler}>
                    {this.props.brandData.map(
                      ({brand_name}) =>
                      <option
                        value={brand_name} >{brand_name}
                        </option>
                      )}
                </select>
              </div>
                <div>{this.props.getModelDropdown()}
              </div>

              <button
                type="submit"
                className='btn btn-primary'
                disabled={this.props.isLoading} onClick={!this.props.isLoading ? this.props.handleSubmitHandler : null}>{this.props.isLoading ? 'Loading...' : 'save'}</button>

            </form>
        </div>
      )
    }
}
export default FormUpdate;
// <button
//   className='btn btn-secondary'
//   onClick={this.clearForm}>cancel</button>
