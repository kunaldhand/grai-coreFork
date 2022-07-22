from typing import Dict, Type, Callable, Optional, Literal
from typing import List, Optional, Union
from pydantic import BaseModel, Field
from uuid import UUID
from typing_extensions import Annotated
from grai_client.schemas.utilities import PlaceHolderSchema, BaseGraiType


class EdgeNodeValues(BaseModel):
    name: str
    namespace: str

    def __hash__(self):
        return hash(hash(self.name) + hash(self.namespace))


class V1(BaseModel):
    id: Optional[UUID]
    data_source: str
    source: Union[EdgeNodeValues, UUID]
    destination: Union[EdgeNodeValues, UUID]
    is_active: Optional[bool] = True
    metadata: Optional[Dict] = {}

    def __hash__(self):
        return hash(hash(self.source) + hash(self.destination))


class V2(PlaceHolderSchema):
    pass


class EdgeV1(BaseModel):
    version: Literal["v1"]
    type: Literal["Edge"]
    spec: V1

    def from_spec(self, spec_dict: Dict):
        args = {
            'version': self.version,
            'type': self.type,
            'spec': spec_dict,
        }
        return type(self)(**args)


class EdgeV2(BaseModel):
    version: Literal["v2"]
    type: Literal["Edge"]
    spec: V2


Edge = Annotated[Union[EdgeV1, EdgeV2], Field(discriminator="version")]


class EdgeType(BaseGraiType):
    name = "edges"
    type = "Edge"
