#!/bin/bash
set -e

# Restore the database if it does not already exist.
if [ -f /drizzle/db ]; then
	echo "Database already exists, skipping restore"
	litestream replicate /drizzle/data.db "${REPLICA_URL}"
else
	echo "No database found, restoring from replica if exists"
	litestream restore -v -if-replica-exists -o /drizzle/data.db "${REPLICA_URL}"
	litestream replicate /drizzle/data.db "${REPLICA_URL}"
fi
