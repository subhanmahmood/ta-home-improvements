const helpers = {
	date: function(){
		const today = new Date();
		let d = today.getDate();
		let m = today.getMonth();
		if(d < 10){
			d = ('0' + d).slice(-2)
		}
		if(m + 1 < 10){
			m = ('0' + (m + 1)).slice(-2);
		}
		const date = today.getFullYear() + "-" + (m) + "-" + d;
		return date
	},
	newDate: function(){
		var today = new Date(+new Date + 12096e5);
		let d = today.getDate();
		let m = today.getMonth();
		if(d < 10){
			d = ('0' + d).slice(-2)
		}
		if(m + 1 < 10){
			m = ('0' + (m + 1)).slice(-2);
		}
		const date = today.getFullYear() + "-" + (m) + "-" + d;
		return date
	},
	mergeSort(arr, type, options){
		function mSort (arr) {
			if(arr.length > 0){
				if (arr.length === 1) {
					return arr
				}
				const middle = Math.floor(arr.length / 2) 
				const left = arr.slice(0, middle)
				const right = arr.slice(middle)		
				return mergeArrays(
					mSort(left),
					mSort(right)
				)
			}
		}
		function mergeArrays (left, right) {
			let result = []
			let indexLeft = 0
			let indexRight = 0
						
			while (indexLeft < left.length && indexRight < right.length) {
				let leftString = ''
				let rightString = ''
				options.forEach(option => {
					leftString = leftString + left[indexLeft][option] + " "
					rightString = rightString + right[indexRight][option] + " "
				});
				if(type === 'asc'){
					if (leftString < rightString) {
						result.push(left[indexLeft])
						indexLeft++
					} else {
						result.push(right[indexRight])
						indexRight++
					}
				}else if(type === 'desc'){
					if (leftString > rightString) {
						result.push(left[indexLeft])
						indexLeft++
					} else {
						result.push(right[indexRight])
						indexRight++
					}
				}
				
			} 	
			return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
		}
		return mSort(arr)
	},
	size: function(obj){
		var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
	}
}

export default helpers