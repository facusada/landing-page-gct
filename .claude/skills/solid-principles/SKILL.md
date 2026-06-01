---
name: solid-principles
description: Apply SOLID design principles to Python codebases. Use when designing classes, refactoring coupled code, evaluating architecture, or reviewing code for maintainability and extensibility. Invoke for Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion violations.
metadata:
  author: gctechs
  version: "1.0.0"
  domain: design
  triggers: SOLID, Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion, clean code, design principles, class design, refactor, coupling, cohesion
  role: specialist
  scope: design, implementation, review
  output-format: code
  related-skills: object-oriented-programmer, fastapi-clean-architecture, python-pro
---

# SOLID Principles

Python-focused SOLID design specialist. Diagnoses violations, refactors to compliance, and enforces the five principles at class and module level.

## When to Use This Skill

- Designing new classes or modules from scratch
- Reviewing existing code for maintainability issues
- Refactoring tightly coupled or hard-to-test code
- Evaluating whether a class has too many responsibilities
- Designing extensible systems that don't require modifying existing code
- Replacing concrete dependencies with abstractions

## The Five Principles

### S — Single Responsibility Principle (SRP)
A class should have only one reason to change. Each class owns exactly one concern.

**Violation signals:**
- Class name contains "And", "Manager", "Handler", "Helper", "Utils"
- Method count > 10 with unrelated concerns
- Multiple unrelated private methods
- Test requires mocking unrelated collaborators

```python
# VIOLATION: handles both business logic and persistence
class UserService:
    def register(self, email: str, password: str) -> User: ...
    def send_welcome_email(self, user: User) -> None: ...  # email concern
    def save_to_db(self, user: User) -> None: ...          # persistence concern
    def hash_password(self, raw: str) -> str: ...          # crypto concern

# COMPLIANT: each class has one reason to change
class UserRegistrar:
    def __init__(self, repo: UserRepository, hasher: PasswordHasher) -> None: ...
    def register(self, email: str, password: str) -> User: ...

class WelcomeEmailSender:
    def send(self, user: User) -> None: ...

class PasswordHasher:
    def hash(self, raw: str) -> str: ...
    def verify(self, raw: str, hashed: str) -> bool: ...
```

### O — Open/Closed Principle (OCP)
Software entities should be open for extension, closed for modification. Add behavior by adding code, not by editing existing code.

**Violation signals:**
- `if isinstance(x, ConcreteType)` chains
- `if type == "A": ... elif type == "B": ...`
- Adding a new case requires modifying core logic

```python
# VIOLATION: every new discount type requires editing this method
class PriceCalculator:
    def apply_discount(self, price: float, discount_type: str) -> float:
        if discount_type == "percentage":
            return price * 0.9
        elif discount_type == "flat":
            return price - 10.0
        elif discount_type == "vip":       # new case = edit existing code
            return price * 0.7
        return price

# COMPLIANT: new discount = new class, zero edits to calculator
from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def apply(self, price: float) -> float: ...

class PercentageDiscount(DiscountStrategy):
    def __init__(self, rate: float) -> None:
        self._rate = rate
    def apply(self, price: float) -> float:
        return price * (1 - self._rate)

class FlatDiscount(DiscountStrategy):
    def __init__(self, amount: float) -> None:
        self._amount = amount
    def apply(self, price: float) -> float:
        return price - self._amount

class PriceCalculator:
    def apply_discount(self, price: float, strategy: DiscountStrategy) -> float:
        return strategy.apply(price)
```

### L — Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types without altering program correctness. A subclass must honor the contract of its parent.

**Violation signals:**
- Subclass raises `NotImplementedError` on inherited methods
- Subclass narrows preconditions or weakens postconditions
- Code checks `isinstance` before calling parent methods

```python
# VIOLATION: Rectangle contract broken by Square
class Rectangle:
    def set_width(self, w: float) -> None:
        self.width = w
    def set_height(self, h: float) -> None:
        self.height = h
    def area(self) -> float:
        return self.width * self.height

class Square(Rectangle):
    def set_width(self, w: float) -> None:  # breaks Rectangle contract
        self.width = w
        self.height = w                      # side effect callers don't expect

# COMPLIANT: separate hierarchy, shared abstraction
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

class Rectangle(Shape):
    def __init__(self, width: float, height: float) -> None:
        self._width = width
        self._height = height
    def area(self) -> float:
        return self._width * self._height

class Square(Shape):
    def __init__(self, side: float) -> None:
        self._side = side
    def area(self) -> float:
        return self._side ** 2
```

### I — Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they don't use. Prefer small, focused interfaces over fat ones.

**Violation signals:**
- Abstract base class with many abstract methods
- Concrete class implements methods that raise `NotImplementedError`
- Mocking a dependency requires stubbing methods not under test

```python
# VIOLATION: all implementors must handle every method
class Storage(ABC):
    @abstractmethod
    def read(self, key: str) -> bytes: ...
    @abstractmethod
    def write(self, key: str, data: bytes) -> None: ...
    @abstractmethod
    def delete(self, key: str) -> None: ...
    @abstractmethod
    def list_keys(self, prefix: str) -> list[str]: ...  # ReadOnlyStorage doesn't need this

# COMPLIANT: segregated interfaces
class Readable(ABC):
    @abstractmethod
    def read(self, key: str) -> bytes: ...

class Writable(ABC):
    @abstractmethod
    def write(self, key: str, data: bytes) -> None: ...

class Deletable(ABC):
    @abstractmethod
    def delete(self, key: str) -> None: ...

class Listable(ABC):
    @abstractmethod
    def list_keys(self, prefix: str) -> list[str]: ...

class ReadOnlyCache(Readable):
    def read(self, key: str) -> bytes: ...

class FullStorage(Readable, Writable, Deletable, Listable):
    def read(self, key: str) -> bytes: ...
    def write(self, key: str, data: bytes) -> None: ...
    def delete(self, key: str) -> None: ...
    def list_keys(self, prefix: str) -> list[str]: ...
```

### D — Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details.

**Violation signals:**
- High-level class instantiates concrete dependencies with `ClassName()`
- Unit test requires real database / filesystem / network
- Changing the database forces changes in business logic

```python
# VIOLATION: business logic is coupled to SQLAlchemy
class OrderService:
    def __init__(self) -> None:
        self._db = SQLAlchemyOrderRepository()  # concrete, not injectable

    def place_order(self, order: Order) -> None:
        self._db.save(order)

# COMPLIANT: depend on abstraction, inject the implementation
from abc import ABC, abstractmethod

class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: Order) -> None: ...
    @abstractmethod
    def find_by_id(self, order_id: str) -> Order | None: ...

class SQLAlchemyOrderRepository(OrderRepository):
    def save(self, order: Order) -> None: ...
    def find_by_id(self, order_id: str) -> Order | None: ...

class InMemoryOrderRepository(OrderRepository):  # for tests
    def __init__(self) -> None:
        self._store: dict[str, Order] = {}
    def save(self, order: Order) -> None:
        self._store[order.id] = order
    def find_by_id(self, order_id: str) -> Order | None:
        return self._store.get(order_id)

class OrderService:
    def __init__(self, repo: OrderRepository) -> None:  # injected abstraction
        self._repo = repo

    def place_order(self, order: Order) -> None:
        self._repo.save(order)
```

## Core Workflow

1. **Diagnose** — identify which principle is violated and why (single cause of change? concrete dependency? fat interface?)
2. **Isolate** — extract the offending responsibility / dependency into a named abstraction
3. **Refactor** — introduce ABC, Protocol, or dataclass to enforce the boundary
4. **Inject** — wire dependencies from the outside (constructor injection preferred)
5. **Test** — verify with `InMemory*` or `Mock*` collaborators; no real I/O in unit tests

## Using `Protocol` vs `ABC`

Prefer `Protocol` for structural subtyping (duck typing) — no inheritance required.
Use `ABC` when you want to enforce an explicit is-a relationship.

```python
from typing import Protocol

class Notifier(Protocol):
    def notify(self, message: str) -> None: ...

# Any class with notify() satisfies Notifier — no import/inheritance needed
class SlackNotifier:
    def notify(self, message: str) -> None:
        ...  # sends to Slack

class EmailNotifier:
    def notify(self, message: str) -> None:
        ...  # sends email

def alert(notifier: Notifier, msg: str) -> None:
    notifier.notify(msg)
```

## Constraints

### MUST DO
- Define interfaces (ABC or Protocol) in the domain/core layer
- Inject all external dependencies through constructors
- One public responsibility per class
- Keep abstract base classes thin (≤ 5 abstract methods per interface)
- Subtypes must fulfill parent postconditions — never weaken them
- Prefer composition over inheritance for behavior reuse

### MUST NOT DO
- Instantiate concrete dependencies inside high-level classes
- Use `isinstance` chains as a substitute for polymorphism
- Create god classes with mixed concerns
- Force implementors to raise `NotImplementedError` for unused methods
- Override methods in ways that surprise callers of the parent type
- Mix I/O and business logic in the same class

## Diagnostic Checklist

Run this checklist before declaring a design compliant:

| Check | Principle |
|-------|-----------|
| Does the class have only one reason to change? | SRP |
| Can new behavior be added without editing this class? | OCP |
| Can every subclass replace its parent without breakage? | LSP |
| Does every client use all methods it depends on? | ISP |
| Does this class depend on abstractions, not concretions? | DIP |

## Knowledge Reference

ABC, Protocol, dataclasses, dependency injection, strategy pattern, adapter pattern, factory pattern, composition over inheritance, Python 3.10+ type hints, mypy, pytest with InMemory fakes
