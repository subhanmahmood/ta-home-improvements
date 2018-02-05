const validationHelpers = {
	checkRegExp: function(value, regex){
		return regex.test(value)
	},
	checkAllTrue: function (obj){
		for(const o in obj)
			if(!obj[o]) return false;
			
		return true;
	},
	checkAllFalse: function(obj){
		for(const o in obj)
			if(obj[o]) return true;
			
		return false;
	},
	presenceCheck(value){
		return value != ''
	},
	rangeCheck(value, min, max){
		if(value.length >= min && value.length <= max){
			return true;
		} else {
			return false;
		}
	},
	checkAlpha: function(char){
		const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
		return (alpha.indexOf(char) != -1)
	},
	checkNumber: function(char){
		const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
		return (num.indexOf(char) != -1)
	},
	checkAlphaNumeric: function(value){
		const errors = new Array()
		for(let i = 0; i < value.length; i++){
			errors.push(!(!validationHelpers.checkAlpha(value[i]) && !validationHelpers.checkNumber(value[i])))
		}
		return validationHelpers.checkAllTrue(errors);
	},
	checkAlphaString: function(value){
		const errors = new Array()
		for(let i = 0; i < value.length; i++){
			errors.push(validationHelpers.checkAlpha(value[i]))
		}
		return validationHelpers.checkAllTrue(errors);
	},
	checkNumericString: function(value){
		const errors = new Array()
		for(let i = 0; i < value.length; i++){
			errors.push(validationHelpers.checkNumber(value[i]))
		}
		return validationHelpers.checkAllTrue(errors);
	}
}

export default validationHelpers