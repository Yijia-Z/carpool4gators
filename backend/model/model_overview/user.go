package model_overview

type DeleteUserReq struct {
	Ids    []string `json:"ids"`
	Phones []string `json:"phones"`
}
