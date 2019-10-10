
// get all
var EmployeeRow = React.createClass({
  
    render: function () {  
        return(  
            <tr>  
                <td>{this.props.item.Id}</td>  
                <td>{this.props.item.Name}</td>  
                                <td>{this.props.item.Email}</td>

                 
            </tr>  
  
            );  
    }  
});  
  
var EmployeeTable = React.createClass({  
          
    getInitialState: function(){  
          
        return{  
            result:[]  
        }  
    },  
    componentWillMount: function(){  
  
        var xhr = new XMLHttpRequest();  
        xhr.open('get', this.props.url, true);  
        xhr.onload = function () {  
            var response = JSON.parse(xhr.responseText);  
  
            this.setState({ result: response });  
  
        }.bind(this);  
        xhr.send();  
    },  
    render: function(){  
        var rows = [];  
        this.state.result.forEach(function (item) {  
            rows.push(<EmployeeRow  key={item.Id} item={item}/>);  
});  
return (<table className="table">  
   <thead>  
       <tr>  
          <th>EmployeeID</th>  
          <th>Name</th>  
                 <th>Email</th>  
          
       </tr>  
   </thead>  
  
    <tbody>  
        {rows}  
    </tbody>  
  
</table>);  
}  
      
});  
  
ReactDOM.render(<EmployeeTable url="api/EmployeeApi/GetAll"/>,   
       document.getElementById('grid'))
// create

var MyInput = React.createClass({
    //onchange event
    handleChange: function (e) {
        this.props.onChange(e.target.value);
        var isValidField = this.isValid(e.target);
    },
    //validation function
    isValid: function (input) {
        //check required field
        if (input.getAttribute('required') != null && input.value ==="") {
            input.classList.add('error'); //add class error
            input.nextSibling.textContent = this.props.messageRequired; // show error message
            return false;
        }
        else {
            input.classList.remove('error'); 
            input.nextSibling.textContent = ""; 
        }
       
        return true;
    },
    
    componentDidMount: function () {
        if (this.props.onComponentMounted) {
            this.props.onComponentMounted(this); //register this input in the form
        }
    },    
    //render
    render: function () {
        var inputField;
        if (this.props.type == 'textarea') {
            inputField = <textarea value={this.props.value} ref={this.props.name} name={this.props.name}
            className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
            }
        else {
            inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} name={this.props.name}
            className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
            }
        return (
                <div className="form-group">
                    <label htmlFor={this.props.htmlFor}>{this.props.label}:</label>
        {inputField}
        <span className="error"></span>
    </div>
            );
    }
});

//React component for generate form
 
var EmployeeForm = React.createClass({
    //get initial state enent
    getInitialState : function(){
        return {
            Name : '',
            Email:'',
            
            Fields : [],
            ServerMessage : ''
        }
    },
    // submit function
    handleSubmit: function (e) {
        debugger;
        e.preventDefault();
        //Validate entire form here
        var validForm = true;
        this.state.Fields.forEach(function(field){
            if (typeof field.isValid === "function") {
                var validField = field.isValid(field.refs[field.props.name]);
               
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server 
        if (validForm) {
            debugger;
            var d = {
                Name: this.state.Name,
                Email : this.state.Email
                
            }
 
            $.ajax({
                type:"POST",
                url : this.props.urlPost,
                data : d,
                success: function (data) {
                   
                    // reload table data
                    ReactDOM.unmountComponentAtNode(document.getElementById('grid'));
                    
                    ReactDOM.render(<EmployeeTable url="api/EmployeeApi/GetAll"/>,   
                   document.getElementById('grid'))
                  
                    //Will clear form here
                    this.setState({
                        Name : '',
                        Email  : '',
                        
                        ServerMessage: data.message
                    });
                
                }.bind(this),                
                error : function(e){
                    console.log(e);
                    alert('Error! Please try again');
                }
            });
        }
    },
    //handle change full name
    onChangeName : function(value){
        this.setState({
            Name : value
        });
    },
   
    onChangeEmail: function (value) {
        this.setState({
            Email: value
        });
    },
    //register input controls
    register : function(field){
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields : s
        })
    },
    //render
    render: function () {


        //Render form 
        return(
            <form name="employeeForm" noValidate onSubmit={this.handleSubmit}>
                <MyInput type={'text'} value={this.state.Name} label={'Name'} name={'Name'} htmlFor={'Name'} isrequired={true}
                    onChange={this.onChangeName} onComponentMounted={this.register} messageRequired={'FullName required'} />
                <MyInput type={'email'} value={this.state.Email} label={'Email'} name={'Email'} htmlFor={'Email'} isrequired={false}
                    onChange={this.onChangeEmail}  onComponentMounted={this.register} messageRequired={'Invalid Email'} />
             
<button type="submit" className="btn btn-default">Submit</button> 
<p className="servermessage">{this.state.ServerMessage}</p>
</form>
        );
     
    }

});
 
//Render react component into the page
ReactDOM.render(<EmployeeForm urlPost="api/EmployeeApi/Create" />, document.getElementById('employeeForm'));








