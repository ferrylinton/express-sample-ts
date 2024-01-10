export function getMessage(name: string): string {
    if(name.trim() === ''){
        throw new Error('Name is empty')
    }else{
        return `Horas ${name} !!`;
    }
}