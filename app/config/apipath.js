class ApiPath{
    getHaMasterBasePath(){
        let domain = document.domain;
        return `http://${domain}:4999`;
    }
    getDataManagerBasePath(){
        let domain = document.domain;
        return `http://${domain}:4997`;
    }
}

export default new ApiPath();