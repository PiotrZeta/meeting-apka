import axios from 'axios';

export interface Meeting {
  id: number;
  title: string;
  description: string;
  date: string;         
  startTime: string;    
  endTime: string;      
  participants: string; 
  status: string;       
}

const API_URL = 'http://localhost:4000/meetings';

export const getMeetings = async (): Promise<Meeting[]> => {
  const res = await axios.get<Meeting[]>(API_URL);
  return res.data;
};

export const getMeetingById = async (id: number): Promise<Meeting> => {
  const res = await axios.get<Meeting>(`${API_URL}/${id}`);
  return res.data;
};

export const saveMeeting = async (meeting: Partial<Meeting>): Promise<Meeting> => {
  if (meeting.id) {
    const res = await axios.put<Meeting>(`${API_URL}/${meeting.id}`, meeting);
    return res.data;
  } else {
    const res = await axios.post<Meeting>(API_URL, meeting);
    return res.data;
  }
};

export const deleteMeeting = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
