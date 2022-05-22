export default ({ store }) => {
    
    const data = localStorage.getItem('ktapp-data');
    if(data){
        store.rosters = JSON.parse(data);
    }

    store.$subscribe(() => {
        localStorage.setItem('ktapp-data', JSON.stringify(store.rosters));
    });
}