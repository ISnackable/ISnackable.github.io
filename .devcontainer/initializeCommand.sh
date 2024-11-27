#!/bin/bash -i

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Create .devcontainer/.env if it does not already exists
[ -e .devcontainer/.env ] || touch .devcontainer/.env
# Load .devcontainer/.env environment variables
source .devcontainer/.env
# Set localWorkspaceFolder environment variable if not already set
[ ! -z "${localWorkspaceFolder}" ] || printf "\nlocalWorkspaceFolder=${SCRIPT_DIR}/..\n" >> .devcontainer/.env