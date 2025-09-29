up:
	docker-compose down
	docker-compose up --build
down:
	docker-compose down
re:
	docker-compose down && docker-compose up --build
logs:
	docker-compose logs -f
backend:
	docker exec -it backend bash
frontend:
	docker exec -it frontend bash
.PHONY: up backend frontend down re logs