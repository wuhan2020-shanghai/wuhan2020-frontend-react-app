import { Reducer } from "redux";
import * as React from 'react';
import { isActionType } from "../../common/StrongAction";
import * as Actions from './actions';
import { IFreeConsultation } from "../../types/interfaces";
import { IApplicationState } from "..";
import { createSelector } from "reselect";

export interface freeConsulationState
{
    pageNum?: number;
    name: string;
    searchText: string,
    url: string;
    id: number;
    consultationlist: IFreeConsultation[];
}

export const initialFreeConsulationStateState: freeConsulationState =
{
    pageNum: 1,
    name: "test",
    searchText: '',
    url: 'test',
    id: 1,
    consultationlist: [],
}

export const consultationsSelector = (state: IApplicationState) => state.freeConsultation.consultationlist;

export const consultationsSearchSelector = (state: IApplicationState) => state.freeConsultation.searchText;

export const searchConsultationSelector = () => {
	return createSelector(
		[consultationsSelector, consultationsSearchSelector],
		(consultationList: IFreeConsultation[], searchText: string) => {
            if (!consultationList) return [];
            console.log(consultationList);
			return consultationList.filter((c) => {
			  const matchSearchText = !searchText || c.name.includes(searchText);
			  return matchSearchText;
      });
		}
	)
}

const FreeConsultationReducer: Reducer<freeConsulationState> = (state: freeConsulationState, act) =>
{
	if (isActionType(act, Actions.UpdateFreeConsultationActions)) {
		return {...state, consultationlist: state.consultationlist.concat(act.list)};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialFreeConsulationStateState};
	} else if (isActionType(act, Actions.SearchConsultationAction)) {
        return {...state, searchText: act.searchText}
    }
	return state || initialFreeConsulationStateState
}

export default FreeConsultationReducer;