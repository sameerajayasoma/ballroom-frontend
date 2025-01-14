import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import { Layout } from "../components/templates";
import { useEffect, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';

import internal from "stream";
import { valueToPercent } from "@mui/base";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BalDateTime } from "../helpers/interfaces";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, useFormControl } from "@mui/material";
import { InputWrapper } from "../components";
import { createChallenge } from "../api/admin";
import axios from "../api/axios";


// data_model:Challenge newChallenge = {title: "", challengeId: "", description: "", difficulty: "HARD", testCase: []};
const CreateChallenge = () => {

    const [challengeTitle, setchallengeTitle] = useState<string>("");
    const [challengeDescription, setchallengeDescription] = useState<string>("");
    const [challengeDifficulty, setchallengeDifficulty] = useState<string>("MEDIUM");
    const [challengeConstraints, setchallengeConstraints] = useState<string>("");
    const [testCaseFile, settestCaseFile] = useState({} as FileList);
    const [templateFile, settemplateFile] = useState({} as FileList);

    const [showNotification, setshowNotification] = useState(false);

    const clearAllInputs = () => {
        setchallengeTitle("");
        setchallengeDescription("");
        setchallengeConstraints("");
        setchallengeDifficulty("MEDIUM");
        settestCaseFile({} as FileList);
        settemplateFile({} as FileList);
    }

    const axiosIns = useAxiosPrivate();

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('testCase', testCaseFile[0], "test001 "+ "_" + Date.now());
        console.log("Hello",templateFile)
        if(Object.keys(templateFile).length > 0){
            formData.append('template', templateFile[0], "template001 "+ "_" + Date.now())
        }
        formData.append('title', challengeTitle)
        formData.append('description', challengeDescription)
        formData.append('difficulty', challengeDifficulty)
        formData.append('constraints', challengeConstraints)
        createChallenge(axiosIns, formData, (res: any) => {setshowNotification(true); clearAllInputs();}, (err: any) => console.log("ERROR OCCURED"))

        // fetch("http://localhost:9092/challengeService/challenge", {
        //     method: "POST",
        //     mode: 'no-cors',
        //     // headers: {
        //     //     "Content-Type": "multipart/form-data",
        //     // },
        //     body: formData
        //     }).then(function (res) {
        //     if (res.ok) {
        //         alert("Perfect! ");
        //     } else if (res.status == 401) {
        //         alert("Oops! ");
        //     }
        //     }, function (e) {
        //     alert("Error submitting form!");
        // });

    }

    const onTestCaseFileChange = (e : any) => {
        settestCaseFile(prev => ({...prev, ...e.target.files}));
    }

    const onTemplateFileChange = (e : any) => {
        settemplateFile(prev => ({...prev, ...e.target.files}));

    }
    
    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Create a Challenge
            </Typography>

            <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Title" variant="outlined" value={challengeTitle} onChange={(e) => setchallengeTitle(e.target.value)}/>

            <br />

            <TextField fullWidth multiline rows={4} sx={{marginY: '1rem'}}  id="outlined-basic" label="Description" variant="outlined" value={challengeDescription} onChange={(e) => setchallengeDescription(e.target.value)}/>

            <br />

            <TextField fullWidth multiline rows={4} sx={{marginY: '1rem'}}  id="outlined-basic" label="Constraints" variant="outlined" value={challengeConstraints} onChange={(e) => setchallengeConstraints(e.target.value)}/>

            <br />

            <FormControl sx={{marginY: '1rem'}} >
                <FormLabel id="demo-controlled-radio-buttons-group">Difficulty</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={challengeDifficulty}
                    onChange={(e) => setchallengeDifficulty(e.target.value)}
                >
                    <FormControlLabel value="EASY" control={<Radio />} label="EASY" />
                    <FormControlLabel value="MEDIUM" control={<Radio />} label="MEDIUM" />
                    <FormControlLabel value="HARD" control={<Radio />} label="HARD" />
                </RadioGroup>
            </FormControl>
            <br />


            <InputWrapper  label="Upload Test Case .zip File: "><input onChange={onTestCaseFileChange} id="testFileInput" type="file" name="submissionFile" accept=".zip"  style={{flex:6}}/></InputWrapper>

            <InputWrapper  label="Upload Template .zip File: "><input onChange={onTemplateFileChange} id="testFileInput" type="file" name="templateFile" accept=".zip"  style={{flex:6}}/></InputWrapper>

            <Button sx={{margin: '1rem'}}variant="contained" onClick={()=>handleSubmit()}>Submit</Button>

            <Snackbar open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Challenge Created Successfully" />
        </Layout>
     );
}
 
export default CreateChallenge;