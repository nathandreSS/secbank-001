from fastapi import Depends
from pydantic import BaseModel


class Pagination(BaseModel):
    page: int = 1
    limit: int = 5


def get_pagination(pagination: Pagination = Depends()) -> Pagination:
    return pagination
