---
name: object-oriented-programmer
description: Design and implement clean object-oriented Python code. Use when modeling domain entities, designing class hierarchies, applying encapsulation, choosing between inheritance and composition, implementing design patterns, or reviewing OOP code for correctness and clarity.
metadata:
  author: gctechs
  version: "1.0.0"
  domain: design
  triggers: OOP, object oriented, class design, encapsulation, polymorphism, inheritance, composition, design patterns, dataclass, abstract class, dunder methods, Python classes
  role: specialist
  scope: design, implementation
  output-format: code
  related-skills: solid-principles, python-pro, fastapi-clean-architecture
---

# Object-Oriented Programmer

Python OOP specialist. Models domains correctly, chooses the right class construct, applies encapsulation, and picks patterns that fit the problem without over-engineering.

## When to Use This Skill

- Modeling domain entities and value objects
- Designing class hierarchies with proper inheritance
- Choosing between dataclass, NamedTuple, class, or ABC
- Implementing encapsulation with properties and private attributes
- Applying design patterns (Factory, Strategy, Observer, Decorator, etc.)
- Reviewing OOP code for anti-patterns (god class, anemic model, shotgun surgery)
- Implementing `__dunder__` methods for Pythonic behavior

## Core OOP Concepts in Python

### Encapsulation

Control access to internal state. Expose behavior, not data.

```python
from dataclasses import dataclass, field
from decimal import Decimal

@dataclass
class BankAccount:
    owner: str
    _balance: Decimal = field(default=Decimal("0"), init=False, repr=False)
    _transactions: list[Decimal] = field(default_factory=list, init=False, repr=False)

    @property
    def balance(self) -> Decimal:
        return self._balance

    def deposit(self, amount: Decimal) -> None:
        if amount <= 0:
            raise ValueError(f"Deposit amount must be positive, got {amount}")
        self._balance += amount
        self._transactions.append(amount)

    def withdraw(self, amount: Decimal) -> None:
        if amount <= 0:
            raise ValueError(f"Withdrawal amount must be positive, got {amount}")
        if amount > self._balance:
            raise ValueError(f"Insufficient funds: balance {self._balance}, requested {amount}")
        self._balance -= amount
        self._transactions.append(-amount)

    def statement(self) -> list[Decimal]:
        return list(self._transactions)  # defensive copy
```

### Inheritance vs Composition

Prefer composition. Use inheritance only for genuine is-a relationships that share behavior, not just interface.

```python
# PREFER COMPOSITION
class Logger:
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class Mailer:
    def send(self, to: str, body: str) -> None:
        ...

class UserNotifier:
    def __init__(self, logger: Logger, mailer: Mailer) -> None:
        self._logger = logger
        self._mailer = mailer

    def notify(self, user: "User", message: str) -> None:
        self._mailer.send(user.email, message)
        self._logger.log(f"Notified {user.email}")

# USE INHERITANCE when subtype truly IS the parent type
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return "Woof"

class Cat(Animal):
    def speak(self) -> str:
        return "Meow"
```

### Polymorphism

Same interface, different behavior. Avoid isinstance chains — let objects decide.

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def charge(self, amount: Decimal) -> str: ...

    @abstractmethod
    def refund(self, transaction_id: str) -> bool: ...

class CreditCard(PaymentMethod):
    def __init__(self, card_number: str) -> None:
        self._card = card_number

    def charge(self, amount: Decimal) -> str:
        return f"CC:{self._card[-4:]}:charged:{amount}"

    def refund(self, transaction_id: str) -> bool:
        return True

class PIX(PaymentMethod):
    def __init__(self, key: str) -> None:
        self._key = key

    def charge(self, amount: Decimal) -> str:
        return f"PIX:{self._key}:charged:{amount}"

    def refund(self, transaction_id: str) -> bool:
        return True

# Caller works with any PaymentMethod — no isinstance needed
def process_payment(method: PaymentMethod, amount: Decimal) -> str:
    return method.charge(amount)
```

### Value Objects

Immutable objects defined by their attributes, not identity. Use `frozen=True` dataclass or `NamedTuple`.

```python
from dataclasses import dataclass
from typing import NamedTuple

@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str

    def __post_init__(self) -> None:
        if self.amount < 0:
            raise ValueError("Money amount cannot be negative")
        if len(self.currency) != 3:
            raise ValueError(f"Invalid currency code: {self.currency}")

    def add(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError(f"Cannot add {self.currency} and {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def __str__(self) -> str:
        return f"{self.amount:.2f} {self.currency}"

class Coordinate(NamedTuple):
    latitude: float
    longitude: float

    def distance_to(self, other: "Coordinate") -> float:
        import math
        return math.sqrt(
            (self.latitude - other.latitude) ** 2
            + (self.longitude - other.longitude) ** 2
        )
```

### Dunder Methods for Pythonic Classes

```python
from dataclasses import dataclass
from typing import Iterator

@dataclass
class Inventory:
    _items: dict[str, int] = None  # type: ignore

    def __post_init__(self) -> None:
        self._items = self._items or {}

    def add(self, sku: str, qty: int) -> None:
        self._items[sku] = self._items.get(sku, 0) + qty

    def __len__(self) -> int:
        return sum(self._items.values())

    def __contains__(self, sku: str) -> bool:
        return sku in self._items and self._items[sku] > 0

    def __iter__(self) -> Iterator[tuple[str, int]]:
        yield from self._items.items()

    def __repr__(self) -> str:
        return f"Inventory({dict(self._items)!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Inventory):
            return NotImplemented
        return self._items == other._items
```

### Factory Pattern

Decouple object creation from usage. Use when construction is complex or varies by type.

```python
from abc import ABC, abstractmethod
from enum import StrEnum

class StorageBackend(StrEnum):
    S3 = "s3"
    LOCAL = "local"
    MEMORY = "memory"

class FileStorage(ABC):
    @abstractmethod
    def upload(self, key: str, data: bytes) -> str: ...
    @abstractmethod
    def download(self, key: str) -> bytes: ...

class S3Storage(FileStorage):
    def upload(self, key: str, data: bytes) -> str: ...
    def download(self, key: str) -> bytes: ...

class LocalStorage(FileStorage):
    def upload(self, key: str, data: bytes) -> str: ...
    def download(self, key: str) -> bytes: ...

class InMemoryStorage(FileStorage):
    def __init__(self) -> None:
        self._store: dict[str, bytes] = {}
    def upload(self, key: str, data: bytes) -> str:
        self._store[key] = data
        return key
    def download(self, key: str) -> bytes:
        return self._store[key]

class StorageFactory:
    _registry: dict[StorageBackend, type[FileStorage]] = {
        StorageBackend.S3: S3Storage,
        StorageBackend.LOCAL: LocalStorage,
        StorageBackend.MEMORY: InMemoryStorage,
    }

    @classmethod
    def create(cls, backend: StorageBackend) -> FileStorage:
        klass = cls._registry.get(backend)
        if klass is None:
            raise ValueError(f"Unknown backend: {backend}")
        return klass()
```

### Observer Pattern

Decouple event producers from consumers.

```python
from collections import defaultdict
from typing import Callable

type EventHandler[T] = Callable[[T], None]

class EventBus:
    def __init__(self) -> None:
        self._handlers: dict[str, list[EventHandler]] = defaultdict(list)

    def subscribe(self, event: str, handler: EventHandler) -> None:
        self._handlers[event].append(handler)

    def publish(self, event: str, payload: object) -> None:
        for handler in self._handlers[event]:
            handler(payload)

# Usage
bus = EventBus()
bus.subscribe("user.registered", lambda u: print(f"Send welcome to {u.email}"))
bus.subscribe("user.registered", lambda u: print(f"Assign free trial to {u.id}"))
bus.publish("user.registered", new_user)
```

### Decorator Pattern (without metaclass magic)

```python
from functools import wraps
import time
import logging

logger = logging.getLogger(__name__)

def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    if attempt == max_attempts:
                        raise
                    logger.warning("Attempt %d/%d failed: %s", attempt, max_attempts, exc)
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def fetch_external_data(url: str) -> dict:
    ...
```

## Core Workflow

1. **Model the domain** — identify entities (mutable identity), value objects (immutable), and services (stateless)
2. **Choose the right construct** — `dataclass`, `NamedTuple`, `ABC`, plain `class`, or `Protocol`
3. **Encapsulate state** — expose behavior via methods, guard invariants in `__post_init__` or setters
4. **Compose, don't inherit** — unless a genuine is-a relationship exists
5. **Add dunders** — `__repr__`, `__eq__`, `__len__`, etc. for Pythonic behavior
6. **Write unit tests** — test behavior, not internal state

## Choosing the Right Construct

| Use Case | Construct |
|----------|-----------|
| Domain entity (mutable, has identity) | `class` with `@dataclass` |
| Value object (immutable, no identity) | `@dataclass(frozen=True)` or `NamedTuple` |
| Interface definition (structural) | `Protocol` |
| Interface definition (nominal, enforced) | `ABC` |
| Simple named tuple | `NamedTuple` |
| Enum | `StrEnum` / `IntEnum` |

## OOP Anti-Patterns to Avoid

| Anti-Pattern | Signal | Fix |
|---|---|---|
| God Class | > 15 methods, multiple concerns | Extract classes (SRP) |
| Anemic Domain Model | Entities are pure data bags | Move business logic into entities |
| Feature Envy | Method uses another class's data more than its own | Move method to that class |
| Shotgun Surgery | One change requires edits across many classes | Consolidate related behavior |
| Primitive Obsession | `str` for email, `float` for money | Create value objects |
| Refused Bequest | Subclass ignores or breaks parent methods | Prefer composition; fix hierarchy |

## Constraints

### MUST DO
- Use `__post_init__` to validate invariants in dataclasses
- Return `NotImplemented` (not `False`) from `__eq__` for unknown types
- Use `@property` for computed attributes; never expose raw mutable collections
- Provide `__repr__` for all non-trivial classes
- Keep inheritance hierarchies shallow (max 2–3 levels)
- Document the contract of abstract methods

### MUST NOT DO
- Use mutable default arguments (`def __init__(self, items=[])`)
- Break encapsulation by accessing `_private` attributes from outside the class
- Create abstract classes with too many methods (violates ISP)
- Override `__init__` in subclasses without calling `super().__init__()`
- Use multiple inheritance for behavior (mixins only for narrow, orthogonal concerns)
- Expose internal lists/dicts directly — return defensive copies

## Knowledge Reference

dataclasses, NamedTuple, ABC, Protocol, @property, @classmethod, @staticmethod, __dunder__ methods, Strategy, Factory, Observer, Decorator, Composite patterns, Python 3.10+ type hints, mypy, pytest
