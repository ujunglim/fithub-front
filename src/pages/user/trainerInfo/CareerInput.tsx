import React, {
  useState,
  useRef,
  FC,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CareerType } from './type';
import {
  deleteTrainerCareer,
  editTrainerCareer,
  fetchCareerInfo,
  fetchTrainerInfo,
} from '../../../apis/trainer';
import { handleDateToString } from '../../../utils/util';

export enum InputTypes {
  company = 'company',
  work = 'work',
}
interface Prop {
  careerId: number;
  setCareerList: (data: any) => void;
}

const CareerInput: FC<Prop> = ({ careerId, setCareerList }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<CareerType>();

  const getCareerInfo = useCallback(async () => {
    const res = await fetchCareerInfo(careerId);
    setData(res);
  }, [careerId]);

  useEffect(() => {
    getCareerInfo();
  }, [getCareerInfo]);

  const handleEdit = async () => {
    if (!isEditing) {
      // 데이터 수정
      inputRef.current?.focus();
    } else {
      // 수정한 데이터 제출
      if (!data) return;
      await editTrainerCareer(careerId, data);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: InputTypes) => {
    const { value } = e.target;
    const newData: any = { ...data };
    newData[type] = value;
    setData(newData);
  };

  const handleCareerDate = (date: Date, type: 'startDate' | 'endDate') => {
    const newData: any = { ...data };
    const strDate = handleDateToString(date);
    if (type === 'startDate') newData.startDate = strDate;
    if (type === 'endDate') newData.endDate = strDate;
    setData(newData);
  };

  const handleDelete = async () => {
    await deleteTrainerCareer(careerId);
    const updatedInfo = await fetchTrainerInfo();
    setCareerList(updatedInfo.data.trainerCareerList);
  };

  return (
    <div className="mb-[10px] flex items-center justify-between">
      <input
        type="company"
        value={data?.company}
        placeholder="회사명"
        ref={inputRef}
        readOnly={!isEditing}
        onChange={(e) => handleChange(e, InputTypes.company)}
        style={{
          width: '150px',
          marginRight: '1rem',
          paddingBottom: '3px',
          outline: 'none',
          borderBottom: isEditing ? '1px solid lightgrey' : 'none',
        }}
      />
      <input
        type="work"
        value={isEditing ? data?.work : `(${data?.work})`}
        placeholder="업무"
        readOnly={!isEditing}
        onChange={(e) => handleChange(e, InputTypes.work)}
        style={{
          width: '100px',
          marginRight: '1rem',
          paddingBottom: '3px',
          outline: 'none',
          borderBottom: isEditing ? '1px solid lightgrey' : 'none',
        }}
      />
      <div>
        {isEditing ? (
          <ReactDatePicker
            id="startDate"
            locale={ko}
            className="w-36 cursor-pointer rounded border border-main px-2 text-black"
            selected={data && new Date(data?.startDate)}
            onChange={(date: Date) => handleCareerDate(date, 'startDate')}
            dateFormat="yyyy-MM-dd"
          />
        ) : (
          data?.startDate
        )}
        ~
        {isEditing && data?.endDate ? (
          <ReactDatePicker
            id="startDate"
            locale={ko}
            className="w-36 cursor-pointer rounded border border-main px-2 text-black"
            selected={new Date(data.endDate)}
            onChange={(date: Date) => handleCareerDate(date, 'endDate')}
            dateFormat="yyyy-MM-dd"
          />
        ) : (
          data?.endDate
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={handleEdit}
          className="h-[30px] w-[70px] rounded"
          style={{
            background: `${isEditing ? '#53dd5a' : '#d1d1d1'}`,
            color: `${isEditing ? 'white' : 'black'}`,
          }}
        >
          {isEditing ? '완료' : '수정'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg ml-3 h-[30px] w-[70px] rounded bg-accent text-white  hover:bg-rose-400"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CareerInput;