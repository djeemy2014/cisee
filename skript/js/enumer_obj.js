import fs from 'fs'
import path from 'path'
import gdal from 'gdal-async'

class Enumer {
    constructor(input_path_file, new_name)
    {
        this.path=path.dirname(input_path_file),
        this.input_file=path.basename(input_path_file),
        this.output_file=new_name
    }
    

}