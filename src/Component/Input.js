import React ,{Fragment} from 'react'

const Input = (props) =>{
	let element=null
	let elementStyle=["form-control mt-1 form-control-md"];
	 if(props.isValid===false && props.touched)
		elementStyle.push("bg-danger")
	 
	 if(props.isValid && props.touched)
	 	elementStyle.push("bg-success")

	switch (props.elementType) {
			case 'input': 		
			 element=(
				<>
				<label id={props.label} className="label text-lead h6 ">{props.label}</label>
			 	<input type={props.elementConfig.type}
				 	className={elementStyle.join(' ')}
			 		value={props.value}
					onChange={props.changed} 
					placeholder={props.elementConfig.placeholder}
					
				/>
				{(props.isValid===false && props.touched)?<div className="text-muted text-center">{props.message}</div>:""}
			  </>)
			 break;
			case "textarea":
			 element=(
				 <>
				 	<label id={props.label} className="label text-lead h6">{props.label}</label>
					<textarea className={elementStyle.join(' ')} 
						placeholder={props.elementConfig.placeholder} 
						value={props.value}
						cols={props.elementConfig.cols} 
						rows={props.elementConfig.rows}
						onChange={props.changed} />
					{(props.isValid===false && props.touched)?<div className="text-muted text-center">{props.message}</div>:""}
				 </>
			 )
			 break;
			case 'select':
				element=(
					<>
						<label id={props.label} className="label text-lead h6">{props.label}</label>
						<select  className={elementStyle.join(' ')} onChange={props.changed}>
							<option selected>Open this select menu</option>
							{
								props.elementConfig.options.map(option=>
									<option key={option.value} value={option.value}>{option.displayValue}</option>
								)
							}
						</select>
						{(props.isValid===false && props.touched)?
						  <div className="text-muted text-center">{props.message}
						  </div>:""}
					</>
				)
			 break;
		default:
			break;
	}
	return(
		<Fragment>
			{element}
			
		</Fragment>
	)
}

export default Input