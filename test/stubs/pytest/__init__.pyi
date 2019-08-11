from typing import Callable, Generator, TypeVar

T = TypeVar('T')
Fixture = Callable[[], Generator[T, None, None]]


def fixture(scope: str) -> Callable[[Fixture[T]], Fixture[T]]:
    ...
