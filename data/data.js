
export const type = [
	{id:1, name: 'task', activeSum: 0, archiveSum: 0},
	{id:2, name:'random', activeSum: 0, archiveSum: 0},
	{id:3, name:'idea', activeSum: 0, archiveSum: 0}
]
export const date =  new Date();
export let dateNow = date.getDay()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
// export let notes = [
// 	{ id:'1', name:'name1' , dateCreat: dateNow , content: 'hello my friend', type:type[0], archived: false },
// 	{ id:'2',name:'name2' ,dateCreat: dateNow, content: 'i have dinner 29.11.2021 and 30.11.2021 and 29.12.2021', type:type[2] , archived: false },
// ]