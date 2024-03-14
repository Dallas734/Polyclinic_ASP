import DirectoryEntity from "./DirectoryEntity";

interface SheduleObj {
    id: number,
    day: DirectoryEntity,
    doctorId: number,
    beginTime?: string,
    endTime?: string
}   
export default SheduleObj;