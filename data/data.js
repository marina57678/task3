
export const type = [
	{id:1, name: 'task', activeSum: 0, archiveSum: 0},
	{id:2, name:'random', activeSum: 0, archiveSum: 0},
	{id:3, name:'idea', activeSum: 0, archiveSum: 0}
]
export const date =  new Date();
export let dateNow = date.getDay()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
