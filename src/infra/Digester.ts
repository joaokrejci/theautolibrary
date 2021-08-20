class Digester {
    private digesters: Map<string, (value: any)=>any> = new Map()

    private digestValue(field: string, value: any) {
        const digester = this.digesters.get(field)
        if(!digester){
            return value
        }

        return digester(value)
    }

    digest(item: any): any {
        if(Array.isArray(item)){
            return item.map(innerItem => this.digest(innerItem))
        }

        if(typeof item === 'object') {
            return Object.entries(item).reduce((object, [field, value]) => {
                return {...object, [field]: this.digestValue(field, value)}
            }, {})
        }

        return item;
    }

    setDigest<I,R>(field: string, digester: (value: I) => R){
        this.digesters.set(field, digester)
    }
}

export default Digester
