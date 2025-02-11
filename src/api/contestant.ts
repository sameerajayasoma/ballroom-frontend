import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BFF_URLS } from "../links/backend";


export const uploadSubmission = async (axiosPrivate: AxiosInstance, data: FormData, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.uploadService + "/solution";
    const method = "POST";
    const headers = {
        "Content-Type": "multipart/form-data"
    };
    axiosPrivate({ url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getLeaderboard = async (axiosPrivate: AxiosInstance, contestId: string, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.submissionService + "/leaderboard/" + contestId;
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));
}



export const getTemplate = async (axiosPrivate: AxiosInstance, challengeId: string, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.challengeService + `/challenges/${challengeId}/template/`;
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers, responseType: "blob" }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getSubmissionFile = async (axiosPrivate: AxiosInstance, submissionId: string, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.submissionService + "/submissions/" + submissionId + "/solution";
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers, responseType: "blob" }).then((res: AxiosResponse) => successHandler(res, submissionId)).catch(() => failHandler());
}

export const getPreviousSubmission = async (axiosPrivate: AxiosInstance, challengeId: string, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.challengeService + `/challenges/${challengeId}/template/`;
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers, responseType: "blob" }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getSubmissions = async (axiosPrivate: AxiosInstance, userId: string, contestId: string, challengeId: string, successHandler: Function, failHandler: Function) => {
    const url = BFF_URLS.submissionService + "/submissions";
    const method = "GET";
    const headers = {};
    const params = {
        userId,
        contestId,
        challengeId
    }
    axiosPrivate({ url, method, headers, params }).then((res: AxiosResponse) => successHandler(res)).catch((err) => failHandler(err));
}

