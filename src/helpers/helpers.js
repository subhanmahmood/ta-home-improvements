const appointmentHelpers = {
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
	mergeSort (arr, attr) {
		console.log("mergeSort1	")
		if(arr.length > 0){
			if (arr.length === 1) {
			// return once we hit an array with a single item
				return arr
			}

			const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
			const left = arr.slice(0, middle) // items on the left side
			const right = arr.slice(middle) // items on the right side

			return merge(
				mergeSort(left),
				mergeSort(right),
				attr
			)
		}
	},
	mergeSort (arr, attr1, attr2) {
		console.log("mergeSort2")
		if(arr.length > 0){
			console.log("array not empty")
			if (arr.length === 1) {
			// return once we hit an array with a single item
				return arr
			}

			const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
			const left = arr.slice(0, middle) // items on the left side
			const right = arr.slice(middle) // items on the right side

			return appointmentHelpers.merge(
				appointmentHelpers.mergeSort(left),
				appointmentHelpers.mergeSort(right),
				attr1,
				attr2
			)
		}else{
			console.log("array empty")
		}
	},
	merge (left, right, attr) {
		console.log("merge1")
		let result = []
		let indexLeft = 0
		let indexRight = 0

		while (indexLeft < left.length && indexRight < right.length) {
			if (left[indexLeft][atr] < right[indexRight][atr]) {
				result.push(left[indexLeft])
				indexLeft++
			} else {
				result.push(right[indexRight])
				indexRight++
			}
		}
		console.log(result)

		return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
	},
	merge (left, right, attr1, attr2) {
		console.log("merge2")
		let result = []
		let indexLeft = 0
		let indexRight = 0

		while (indexLeft < left.length && indexRight < right.length) {
			if ((left[indexLeft][attr1] + " " + left[indexLeft][attr2]) < (right[indexRight][attr1] + " " + right[indexRight][attr2])) {
				result.push(left[indexLeft])
				indexLeft++
			} else {
				result.push(right[indexRight])
				indexRight++
			}
		} 
		console.log(result)

		return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
	}
}

export default appointmentHelpers