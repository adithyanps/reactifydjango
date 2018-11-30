import React , { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies';
import moment from 'moment';
import FormUpdate from './FormUpdate';
import { Route, Redirect } from 'react-router'

class FormInline extends Component {
  constructor(props){
    super(props)
    this.vehicleRegisterRef = React.createRef()
    this.vehiclePriceRef = React.createRef()
  }
  state = {
    VehicleData:[],
    show : false,
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
    isEdit:false,
    vehicle_id:null,
    new_id:null,
    id:null,
    filterItem:[]


  }
  onEdit = (event,id) => {
    event.preventDefault();
    console.log("selctedid",id)
    this.setState({new_id:id,id})
    console.log("oneditnew_id",this.state.new_id)
    console.log("oneditrealnew_id",this.id)

    let vehicle_ide=[]
    event.preventDefault();
    this.setState({isEdit:true})
    const filterItem = this.state.VehicleData.filter(item => {
      return item.id === id;
      // console.log("editing rgstrnmbr",item.register_no)
    })
    console.log("filterItem",filterItem)
    // for (let i in filterItem) {
    //   console.log("filter rgstnmbr",i["register_no"])
    // }
    // console.log("filter rgstnmbr",filterItem["register_no"])
    this.setState({filterItem:filterItem})
    for (let key in filterItem ) {
      vehicle_ide.push(filterItem[0].id)
      // console.log(vehicle_id.slice(-1)[0])
      console.log(vehicle_ide[0])

    }
    this.state.vehicle_id=vehicle_ide[0];
    console.log(this.state.vehicle_id)
  }
  toggleItemHandler = (event) => {
    event.preventDefault();
    this.setState({show:true})
  }
  componentDidMount(){
    const {VehicleData} =this.props
    this.setState({
      VehicleData:[],

    })
    this.setState({
      register_no:null,
      price:null,
      // date:new Date(),
      date:moment(new Date()).format('YYYY-MM-DD'),
      selectedView:'toyota',
      text:'innova',
      new_id:null
    })

    this.loadBrandForm()
    this.loadModelForm()
    // this.vehicleRegisterRef.current.focus()
    this.loadVehicleForm()
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
  deleteHandler =(id)=> {
      const endpoint = `/vehicle/${id}/`
      let orders = this.state.VehicleData;
      const csrfToken = cookie.load('csrftoken')

      let item = orders.filter(function(item ) {
        return item.id === id
         console.log(item)

      } );
      if (csrfToken !== undefined) {
        let lookupOptions = {
          method :"DELETE",
          headers : {
            'Content-Type': 'application/json',
             'X-CSRFToken':csrfToken
          },
          // body :JSON.stringify(dataContent),
          credentials:'include'
        }
        fetch(endpoint,lookupOptions)
        .then((response) => {
          orders.splice(orders.indexOf(item),1);
          this.setState({orders:orders})
          response.json()
            .then(function(data) {
              console.log(data);
            })
        })
        // .then((responseData)=>{
        //   console.log(responseData)
        //   // if (thisComp.props.newPostItemCreated) {
        //   //   thisComp.props.newPostItemCreated(responseData)
        //   // }
        //   thisComp.clearForm()
        // })
        // .catch((error)=> {
        //   console.log('error',error)
        //   alert("deleted")
        // })
      }
  }
  deleteHandler1 = (id) => {
    // event.preventDefault();
    let new_id = this.state.new_id
    console.log("update new_id",new_id)
    // const VehicleData  =this.state.VehicleData
    const endpoint = `/vehicle/${id}/`
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    let orders = this.state.VehicleData;
    let item = orders.filter(function(item ) {
      return item.id === id
       console.log(item)

    } );

    if (csrfToken !== undefined) {
      let lookupOptions = {
        method :"DELETE",
        headers : {
          'Content-Type': 'application/json',
           'X-CSRFToken':csrfToken
        },
        // body :JSON.stringify(dataContent),
        credentials:'include'
      }
      fetch(endpoint,lookupOptions)
      .then((response) => {
        orders.splice(orders.indexof(item),1);
        thisComp.setState({orders:orders})
        return response.json()
      })
      // .then((responseData)=>{
      //   console.log(responseData)
      //   // if (thisComp.props.newPostItemCreated) {
      //   //   thisComp.props.newPostItemCreated(responseData)
      //   // }
      //   thisComp.clearForm()
      // })
      .catch((error)=> {
        console.log('error',error)
        alert("deleted")
      })
    }
  }
  updateForm(dataContent) {
    let new_id = this.state.new_id
    console.log("update new_id",new_id)
    const VehicleData  =this.state.VehicleData
    const endpoint = `/vehicle/${new_id}/`
    const csrfToken = cookie.load('csrftoken')
		let thisComp = this
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method :"PUT",
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
        // alert("pls try again later")
      })
    }
  }
  handleSubmit = (event) => {
      event.preventDefault();
      const VehicleData  =this.state.VehicleData
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
      // if (VehicleData !== undefined){
        this.updateForm(dataContent)
        // this.deleteHandler()
      // } else {
        //createForm
      // }
      console.log(data);
      <Redirect to="/"/>
      console.log("datacontent",dataContent);
      console.log("dranddata",this.state.brandData)

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

  loadVehicleForm = () => {
    const endpoint = '/vehicle/api/'
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
  selectBrandHandler = (e) => {
    this.setState({selectedView:e.target.value})
  }
  render(){
    console.log(this.state.VehicleData)
    const {selectedView,register_no,price,date,brand_id,model_id} = this.state;
    return(
        <div>
          <h1>saved datas</h1>
          {
            this.state.isEdit ? (
            <FormUpdate
              handleSubmitHandler={this.handleSubmit}
              handleInputChangeHandler={this.handleInputChange}
              brandData={this.state.brandData}
              getModelDropdown={this.getModelDropdown}
              isLoading={this.state.isLoading}
              selectBrandHandler={this.selectBrandHandler}
              VehicleData={this.state.VehicleData}
              filterItem={this.state.filterItem}/>
            ) : (  this.state.VehicleData.length > 0 ? this.state.VehicleData.map(order => (
                <div key={order.id}>
                  <form>
                    <input value={order.brand_name} />
                    <input value={order.model_name}/>
                    <input value={order.date} />
                    <input  value={order.register_no}/>
                    <input value={order.value} />
                    <button onClick={(id) =>this.deleteHandler(order.id)}>delete</button>
                    <button onClick={ (event,id)=>this.onEdit(event,order.id)}>edit</button>
                  </form>
                </div>
              )
            ): <p>there is no saved data</p>)
          }


        </div>
    )
  }
}
export default FormInline;
// <div>
// <form onSubmit={this.handleSubmit} ref={(el) => this.vehicleCreateForm = el}>
//   <div className='form-group'>
//     <label for='register_no'>register-no</label>
//     <input
//       type='text'
//       id='register_no'
//       name='register_no'
//       ref={this.vehicleRegisterRef}
//       value={register_no}
//       className='form-control'
//       placeholder='enter register-number here---'
//       onChange={this.handleInputChange}
//       required />
//     </div>
//     <div className='form-group'>
//       <label for='price'>price</label>
//       <input
//         type='text'
//         id='price'
//         name='price'
//         ref={this.vehiclePriceRef}
//         className='form-control'
//         value={price}
//         placeholder='enter price here---'
//         onChange={this.handleInputChange}
//         required />
//       </div>
//       <div className='form-group'>
//         <label for='publish'>Publish Date</label>
//         <input
//           type='date'
//           id='date'
//           name='date'
//           value={date}
//           className='form-control'
//           onChange={this.handleInputChange}
//           required='required'/>
//       </div>
//       <div>
//         <select
//           onChange={(e)=> this.setState({selectedView:e.target.value})}>
//             {this.state.brandData.map(
//               ({brand_name}) =>
//               <option
//                 value={brand_name} >{brand_name}
//                 </option>
//               )}
//         </select>
//       </div>
//         <div>{this.getModelDropdown()}
//       </div>
//
//       <button
//         type="submit"
//         className='btn btn-primary'
//         disabled={this.state.isLoading} onClick={!this.state.isLoading ? this.handleSubmit : null}>{this.state.isLoading ? 'Loading...' : 'save'}</button>
//       <button
//         className='btn btn-secondary'
//         onClick={this.clearForm}>cancel</button>
//     </form>
// </div>
