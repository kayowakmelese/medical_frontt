import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar, } from '@material-ui/core'


class EditItems extends React.Component{

    constructor(props){
        super(props)
        this.state=({
            category:[],alert:false,alertmessage:'',catid:0,subcatid:0,productid:0,itemname:'',price:0
        })
    }

    async componentDidMount(){
        const resp=await loadData({},'listCategory',false)
        this.setState({category:resp.data})
        console.log(resp)
    }

    selectCat(event){
        this.setState({catid:event.target.value})
    }
    setSubCat(event){
        this.setState({subcatid:event.target.value})
    }
    setProduct(event){
        this.setState({productid:event.target.value})
    }
    setName(event){
        this.setState({itemname:event.target.value})
    }
    setMoney(event){
        this.setState({price:event.target.value})
    }
    async submitform(){
        if(this.state.productid!==0 && this.state.itemname.length>0 && this.state.price!==0){
            let params={'name':this.state.itemname,'product':this.state.productid,'price':this.state.price}
            const resp=await loadData(params,'newItem',false)
            if(resp.status!==200){
                this.setState({alert:true,alertmessage:"cannot connect to the server"})
            }else{
                this.setState({alert:true,alertmessage:"item added successfully"})
            }
        }else{
            this.setState({alert:true,alertmessage:"Fill the required forms"})
        }
    }




    render(){
        return <div className="padding">
         <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
        
        <div className="flex">
        <FontAwesomeIcon icon={faCartPlus} className="marginrit heightfull" style={{width:'25px'}}/>
            <h1>Add Items</h1>
        </div>
        <br></br>
        <div className="">
        <FormControl variant="outlined" className="w-100 whitebg">
                <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
                    <Select required 
                        id="selectProduct"
                        label="Select Product"
                        
                        onChange={this.selectCat.bind(this)}
                    >

                        {this.state.category.map((data, index) => {
                            return <MenuItem id={"menu_"+data.id} value={data.id}>{data.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                </div>
        <br></br>
        <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-label">Select SubCategory</InputLabel>
                    <Select required
                        id="selectSubCat"
                        label="Select SubCategory"
                        
                        onChange={this.setSubCat.bind(this)}

                    >

                        {this.state.category.map((data, index) => {
                            
                            if(data.id===this.state.catid){
                                return data.SubCategories.map((subdata,index)=>{
                                    return <MenuItem key={"submenu_"+index} id={"submenu_" + subdata.id} value={subdata.id}>{subdata.name}</MenuItem>
                       
                                })
                               
                            }else{
                                return null;
                            }
                           })}

                    </Select>
                </FormControl>
                <br></br><br></br>
        <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-label">Select Product</InputLabel>
                    <Select required
                        id="selectProduct"
                        label="Select Product"
                        onChange={this.setProduct.bind(this)}
                    >

                        {this.state.category.map((data, index) => {
                            if(data.id===this.state.catid){
                                return data.SubCategories.map((subdata,index)=>{
                                    if(subdata.id===this.state.subcatid){
                                        return subdata.Products.map((product,index)=>{
                                            console.log(product)
                                            return <MenuItem key={"product"+index} id={"product" + product.id} value={product.id}>{product.name}</MenuItem>
                       
                                        })
                                       
                                    }else{
                                        return null;
                                    }
                                   
                                })
                               
                            }else{
                                return null;
                            }
                           })}

                    </Select>
                </FormControl>
                <br></br><br></br>
                <div className="flex">
                <TextField onChange={this.setName.bind(this)} label="Item Name" variant="outlined" className="w-100 whitebg marginrit"/><TextField type="number" onChange={this.setMoney.bind(this)} label="money" variant="outlined" className="whitebg"/><br></br>
                
                </div>
                <br></br>
                        <Button onClick={this.submitform.bind(this)} variant="contained" color="primary" disableElevation className="active morepadding w-100"  size="large">SUBMIT</Button>
        </div>
    }
}


export default EditItems