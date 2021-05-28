import React , { useState}from 'react'
import Input from '../Component/Input'
import 'bootstrap/dist/css/bootstrap.css';


const OrderDetails = () =>{
	const [orderForm , setFormDetails] = useState ({
		Email :{
			elementType:"input",
			elementConfig : {
				type:"text",
				placeholder:"eg: johndoe@gmail.com"
			},
			value:"",
			validation:{
				required:true,
				sanitizeEmail:true
			},
			validationMessage:null,
			touched:false,
			isValid:false

		},
		Phone_No:{
			elementType:"input",
			elementConfig:{
				type:"number",
				placeholder:"eg: +91XXXXXXXXXX",

			},
			value:"",
			validation:{
				minLength:10,
				maxLength:12,
				required:true
			},
			validationMessage:"Please input valid phone number",
			touched:false,
			isValid:false
		},
		Street:{
			elementType:"textarea",
			elementConfig:{
				cols:20,
				rows:5,
				placeholder:"street_name"
			},
			value:"",
			validation:{
				minLength:5,
				required:true
			},
			validationMessage:"Enter your valid street name",
			touched:false,
			isValid:false,
		},
		Zip_Code:{
			elementType:"input",
			elementConfig:{
				type:"number",
				placeholder:"zipcode"
			},
			value:"",
			validation:{
				required:true,
				sanitizeZipCode:true
			},
			validationMessage:"Enter valid zip-code",
			touched:false,
			isValid:false
		},
		Payment_mode:{
			elementType:"select",
			elementConfig:{
				options:[{value:"cod",displayValue:"COD"},{value:"debit/credit",displayValue:"Debit/Credit"}]
			},
			validation:{
				required:true
			},
			validationMessage:"Please select the payment_mode!",
			touched:false,
			isValid:true
		},
		Delivery_mode:{
			elementType:"select",
			elementConfig:{
				options:[{value:"default",displayValue:"Default"},{value:"fast",displayValue:"Fast"}]
			},
			validation:{
				required:true
			},
			validationMessage:"Please select the delivery mode!",
			touched:false,
			isValid:true
			
		}
	})
	const [formValid,setFormValid]=useState(false)
	const checkValidation=(value,validation)=>{	
		let isValid = true;
		if(validation.required){
			 isValid = value.trim()!=='' && isValid
		}
		if(validation.minLength){
			isValid=value.length>=validation.minLength && isValid
		}
		if(validation.maxLength){
			isValid=value.length<=validation.maxLength && isValid
		}
		if(validation.sanitizeEmail){
			if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
				isValid=true
			}else{
				isValid=false
			}
		}
		if(validation.sanitizeZipCode){
			if(/(^\d{6}$)/.test(value)){
				isValid=true;
			}else{
				isValid=false
			}
		}
		return isValid
	}

	const inputChangeHandler=(event,element_name)=>{
		const elementsList={...orderForm}
		const updatingElement={...elementsList[element_name]}
		updatingElement.value=event.target.value;
		updatingElement.touched=true
		updatingElement.isValid=checkValidation(event.target.value,updatingElement.validation)
		elementsList[element_name]=updatingElement;

		setFormDetails(elementsList);
		let isFormValid=true
		for (const elem in elementsList) {
			isFormValid=elementsList[elem].isValid && isFormValid
		}
		setFormValid(isFormValid)
	}

	const orderHandler = (event) =>{
		event.preventDefault();
		let order={}
		for (const elem in orderForm) {
			order[elem]=orderForm[elem].value
		} 
		//TODO: Post your order-details on to your backend
		localStorage.setItem("order-detail",JSON.stringify(order))
		
	}

	
	let formArray = [];
	Object.entries(orderForm).map(elem=>{
		formArray.push({
			name:elem[0],
			config: elem[1]
		})
	})
	// [{	name:"Email",
	// 	config:{
	// 			elementType:"input",
	// 			elementConfig:{type:"text"},
	// 			value:"",
	// 			validation:{
	// 				required:true
	// 			},
			
	// 	}
	// }]
	return (
		<div className="container p-1 d-flex flex-column " >
		 	<div className="form-header text-center"><h2>Enter Order Details</h2></div>
			<div className="form-elements p-2">
			<form onSubmit={orderHandler}>
				{	
					formArray.map(elem=>
						<Input key={elem.name}
							   label={elem.name}
							   elementType={elem.config.elementType}
							   elementConfig={elem.config.elementConfig}
							   value={elem.config.value}
							   changed={(e)=> 
							   	inputChangeHandler(e,elem.name)}
							   touched={elem.config.touched}
							   isValid={elem.config.isValid}
							   message={elem.config.validationMessage}
						/>		
					)
				}
			 	<div className="text-center mt-2">
				 	<button type="submit" className="m-auto btn btn-success btn-lg" disabled={!formValid}>Submit</button>
				</div>
			</form>
			</div>
		</div>
	)
}

export default OrderDetails;