
import './App.css';
import Dashboard from './components/Dashboard'
import React from 'react'
import { faUserShield, faCube,faUserCog,faCartArrowDown,faDice} from '@fortawesome/free-solid-svg-icons'
import IconMenu from './components/snippets/iconMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import AddCategory from './components/AddCategory'
import AddProduct from './components/AddProduct'
import AddItems from './components/editItems'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: '', color: 'blue', clicked: 'one' }
  }

  makeActive = (id,target) => {
    console.log("clicked here" + id)
      document.getElementById(this.state.clicked).classList.remove("active")
      this.setState({ clicked: id })
      target.classList.add("active")

    


  }
  render() {
    return <div className="flex padding">
      <BrowserRouter>
        <div className="sidenavigation w-20 whitebg lilpadding radius">
          <div  >
            <div id="zero" className="padding radius flex" >
              <FontAwesomeIcon icon={faUserShield} className="riticon" color={"#4BA0FA"} />
              <p className="headertext" style={{ color: "#4267FA" }}>Admin Panel</p>
            </div></div>
          <Link to="/addCategory"  >
            <div id="one" className="padding radius outliner active " onClick={(e)=>this.makeActive("one",e.currentTarget)}>
              <IconMenu text="Category" icon={faDice} color="white" />
            </div>


          </Link>
          <Link to="/editProduct" >
          <div id="two" className="padding radius  outliner" onClick={(e)=>this.makeActive("two",e.currentTarget)}>
            <IconMenu text="Add Product" icon={faCartArrowDown} color="gray" />
            </div>
          </Link>

          <Link to="/editItems" >
          <div id="four" className="padding radius  outliner" onClick={(e)=>this.makeActive("four",e.currentTarget)}>
            <IconMenu text="Add Items" icon={faCube} color="gray" />
            </div>
          </Link>

          <Link to="/">
          <div id="three" className="padding radius  outliner" onClick={(e)=>this.makeActive("three",e.currentTarget)}>
            <IconMenu text="Settings" icon={faUserCog} color="gray" />
            </div>
          </Link>
        </div>

        <div className="sidenavigation almostwhitebg w-80 padding radius">

          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/addCategory" component={AddCategory} />
            <Route path="/editProduct" component={AddProduct} />
            <Route path="/editItems" component={AddItems} />
          </Switch>

        </div>
      </BrowserRouter>
    </div>


  }
}

export default App;
