from fastapi import APIRouter, Depends
from starlette import status
from starlette.responses import JSONResponse

from src.modules.user.controller.use_cases import (
    CreateUserUseCase,
    LoginUseCase,
    RefreshUseCase,
    GetInfoUseCase,
)

from src.modules.user.view.schemas.request import CreateUser, Login, Refresh
from src.modules.user.view.schemas.response import TokensResponse, GetInfoResponse
from src.modules.user.dependencies.get_user import verify_access_token

router = APIRouter(prefix="/user", tags=["User"])


@router.post("/")
async def create_user(data: CreateUser) -> JSONResponse:
    use_case = CreateUserUseCase()
    await use_case.execute(data)

    return JSONResponse({}, status_code=status.HTTP_201_CREATED)


@router.post("/login", response_model=TokensResponse)
async def login(data: Login) -> JSONResponse:
    use_case = LoginUseCase()
    tokens = await use_case.execute(data)

    return JSONResponse(tokens.dict())


@router.put("/refresh", response_model=TokensResponse)
async def refresh(data: Refresh, user=Depends(verify_access_token)) -> JSONResponse:
    use_case = RefreshUseCase()
    tokens = await use_case.execute(data=data, user=user)

    return JSONResponse(tokens.dict())


@router.get("/", response_model=GetInfoResponse)
async def get_info(user=Depends(verify_access_token)) -> JSONResponse:
    use_case = GetInfoUseCase()
    info = await use_case.execute(user=user)

    return JSONResponse(
        {"id": str(info.id), "cash": info.cash, "balance": info.balance}
    )
