# Femme Storm

## Initial Setup

This is setup that only needs to be run once when setting up the project for testing. Once you do this, you don't need to do it again unless something gets out of order.

### Installation

1. Make sure all of the dependencies are installed:

```shell
yarn install
```

> [!NOTE]
> `node >=22.12.0` is required.

### Environment Variables

2. Copy the sample `.env.sample` file to a `.env` file where you can put in your API keys and secrets to test with real data.

```shell
cp .env.sample .env
```

3. Replace the dummy values in the `.env` variables with your real environment variables

## Development

To run the development server, run:

```shell
yarn dev
```
