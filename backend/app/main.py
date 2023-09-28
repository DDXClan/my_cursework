from fastapi import FastAPI
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
from app.routes.auth import auth
from app.routes.items import items
from app.settings import img_folder
app = FastAPI()
app.include_router(items)
app.include_router(auth)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/img/{img}', status_code=200)
async def get_img(img: str):
    return FileResponse(f'{img_folder}/{img}')