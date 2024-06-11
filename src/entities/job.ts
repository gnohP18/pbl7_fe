export interface Job {
    job_id?: string;
    job_type?: string,
    step?: number,
    status?: string,
    created_at?: string,
    begin_at?: string,
    end_at?: string
}

export interface JobResult {
    job_type?: string;
    job_id?: string;
    total_record?: number;
    created_at?: string;
    begin_at?: string;
    end_at?: string;
}