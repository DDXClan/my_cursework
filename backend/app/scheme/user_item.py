from pydantic import BaseModel


class UserItemScheme(BaseModel):
    item: int
