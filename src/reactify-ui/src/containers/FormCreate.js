import React , { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies';
import moment from 'moment';
import { Button,ButtonToolbar } from 'react-bootstrap';



class FormCreate extends Component {
  constructor(props){
    super(props)
    this.vehicleRegisterRef = React.createRef()
    this.vehiclePriceRef = React.createRef()
  }
  state={
    brandData:[],
    modelData:[],
    register_no:null,
    price:null,
    date:new Date(),
    selectedView:'',
    errors:{},
    brand_id:[],
    model_id:[],
    isLoading: false,
    text:'',
  }

  componentDidMount(){
    this.setState({
      register_no:null,
      price:null,
      // date:new Date(),
      date:moment(new Date()).format('YYYY-MM-DD'),
      selectedView:'toyota',
      text:'innova'
    })
    this.loadBrandForm()
    this.loadModelForm()

    this.vehicleRegisterRef.current.focus()
  }
  loadModelForm = () => {
    const endpoint = '/vehicle/model/'
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
      thisComp.setState({modelData:responseData})
    }).catch((error) => {
      console.log("error",error)
    })
  }
  loadBrandForm = () => {
    const endpoint = '/vehicle/brand/'
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
      thisComp.setState({brandData:responseData})
    }).catch((error) => {
      console.log("error",error)
    })
  }
  createForm(dataContent) {
    const endpoint = '/vehicle/'
    const csrfToken = cookie.load('csrftoken')
		let thisComp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method :"POST",
        headers : {
          'Content-Type': 'application/json',
           'X-CSRFToken':csrfToken
        },
        body :JSON.stringify(dataContent),
        credentials:'include'
      }
      fetch(endpoint,lookupOptions)
      .then((response) => {
        return response.json()
      }).then((responseData)=>{
        console.log(responseData)
        // if (thisComp.props.newPostItemCreated) {
        //   thisComp.props.newPostItemCreated(responseData)
        // }
        thisComp.clearForm()
      }).catch((error)=> {
        console.log('error',error)
        alert("pls try again later")
      })
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
    console.log(this.state)
    let data = this.state
    console.log(this.state.model_id.slice(-1)[0])
    console.log(this.state.brand_id.slice(-1)[0])

    let dataContent = {
      model_name:this.state.model_id.slice(-1)[0],
      brand_name:this.state.brand_id.slice(-1)[0],
      register_no:this.state.register_no,
      value:this.state.price,
      date:this.state.date
    }
    console.log(data);
    console.log(dataContent);
    console.log(this.state.brandData)
    this.createForm(dataContent)
  }
  clearForm = () => {
    this.vehicleCreateForm.reset();
  }
  clearFormRefs = () => {
    this.vehicleRegisterRef=''
    this.vehiclePriceRef=''
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
      if (value.length > 12) {
        alert("too long")
      }
    }
  this.setState({[key]:value})
  }
  getModelDropdown = () => {
   // var that = this;
     let brand_id = this.state.brand_id;
     let model_id = this.state.model_id;
     console.log(this)
     const view = this.state.brandData.filter(({brand_name,id}) => brand_name === this.state.selectedView)[0]
     console.log(view)
       let b_id =null;
       console.log(b_id)
     for (let key in view ) {
        b_id = view["id"]
          console.log(b_id)
      }
      console.log(b_id)
     //
       brand_id.push(b_id)
     //  console.log(brand_id)
     //  let bb_id = brand_id.slice(-1)[0]
     //  console.log('hei',bb_id)
     // //  // brand = b_id;
     // //  console.log(brand_id)
     //    console.log(brand_id.slice(-1)[0]);
     // //
     console.log(b_id)
     const sample = this.state.modelData.filter(({id,brand_name,model_name}) => brand_name === b_id);
     console.log(sample)
      var m_id=null;
      const match = sample.filter(({id,brand_name,model_name}) => model_name === this.state.text);
      console.log(match)
      for (let key in match ) {
        model_id.push(match[0].id)
        console.log(model_id.slice(-1)[0])
      }
      return (
        <div>
        <select onChange={(e) => this.setState({text:e.target.value})}>
        {sample.map(m => <option
           value={m.model_name}>{m.model_name}</option>)}
        </select>
        </div>
      )

    }
  render(){
    const {date,selectedView} = this.state;

    return(
      <form onSubmit={this.handleSubmit} ref={(el) => this.vehicleCreateForm = el}>
        <div className='form-group'>
          <label for='register_no'>register-no</label>
          <input
            type='text'
            id='register_no'
            name='register_no'
            ref={this.vehicleRegisterRef}
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
                onChange={(e)=> this.setState({selectedView:e.target.value})}>
                  {this.state.brandData.map(
                    ({brand_name}) =>
                    <option
                      value={brand_name} >{brand_name}
                      </option>
                    )}
              </select>
            </div>
              <div>{this.getModelDropdown()}
            </div>

            <button
              type="submit"
              className='btn btn-primary'
              disabled={this.state.isLoading} onClick={!this.state.isLoading ? this.handleSubmit : null}>{this.state.isLoading ? 'Loading...' : 'save'}</button>
            <button
              className='btn btn-secondary'
              onClick={this.clearForm}>cancel</button>
          </form>
    )
  }
}
export default FormCreate;
