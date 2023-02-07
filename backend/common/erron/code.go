package errno

var (
	OK                  = &Errno{Code: 0, Message: "OK"}
	InternalServerError = &Errno{Code: 10001, Message: "服务器内部错误"}
	NoParams            = &Errno{Code: 10002, Message: "缺少参数"}
	ErrParams           = &Errno{Code: 10003, Message: "参数有误"}
	OperationErr        = &Errno{Code: 10009, Message: "操作失败"}
	AddErr              = &Errno{Code: 10010, Message: "新增失败"}
	DeleteErr           = &Errno{Code: 10011, Message: "删除失败"}
	UpdateErr           = &Errno{Code: 10012, Message: "更新失败"}
	QueryErr            = &Errno{Code: 10013, Message: "查询失败"}
)
