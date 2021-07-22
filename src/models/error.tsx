import { Color } from "@material-ui/lab/Alert";

class CustomError extends Error { 

    severity: Color

    constructor(message: string | undefined, severity: Color = "error") {
      super(message);
      this.severity = severity;
    }
}

export default CustomError