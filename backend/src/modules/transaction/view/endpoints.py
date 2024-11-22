from typing import List, Dict
from starlette import status
from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.modules.common.dependencies.pagination import get_pagination, Pagination
from src.modules.common.view.schemas.response import ItemsPagination
from src.modules.transaction.controller.use_cases.get_transactions import (
    GetTransactionsUseCase,
)
from src.modules.transaction.view.schemas.request import (
    DepositData,
    WithdrawData,
    TransferData,
)
from src.modules.transaction.view.schemas.response import TransactionSchema
from src.modules.user.export import verify_access_token
from src.modules.transaction.controller.use_cases import (
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
)

router = APIRouter(prefix="/transaction", tags=["Transaction"])


@router.post("/deposit", response_model=TransactionSchema)
async def deposit(data: DepositData, user=Depends(verify_access_token)):
    use_case = DepositUseCase()
    result = await use_case.execute(amount=data.amount, user=user)

    return JSONResponse(
        {
            "id": str(result.id),
            "description": result.description,
            "from": str(result.from_user),
            "to": str(result.to_user),
            "amount": result.amount,
        }
    )


@router.post("/withdraw", response_model=TransactionSchema)
async def withdraw(
    data: WithdrawData, user=Depends(verify_access_token)
) -> JSONResponse:
    use_case = WithdrawUseCase()
    result = await use_case.execute(amount=data.amount, user=user)

    return JSONResponse(
        {
            "id": str(result.id),
            "description": result.description,
            "from": str(result.from_user),
            "to": str(result.to_user),
            "amount": result.amount,
        }
    )


@router.post("/transfer")
async def transfer(
    data: TransferData, user=Depends(verify_access_token)
) -> JSONResponse:
    use_case = TransferUseCase()
    await use_case.execute(
        amount=data.amount,
        to_user=data.to_user,
        user=user,
        description=data.description,
    )

    return JSONResponse({}, status.HTTP_201_CREATED)


@router.get("/", response_model=ItemsPagination[TransactionSchema])
async def get_transactions(
    pagination: Pagination = Depends(get_pagination), user=Depends(verify_access_token)
):
    use_case = GetTransactionsUseCase()
    transactions = await use_case.execute(
        page=pagination.page, limit=pagination.limit, user_id=user.id
    )

    return transactions
