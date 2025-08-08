# FreelanceChain - Decentralized Freelancing Platform

A decentralized freelancing platform built on the Ethereum blockchain that connects freelancers and employers through smart contracts for secure, transparent transactions.

## Features

- **Decentralized & Secure**: Built on Ethereum with smart contract escrow
- **Instant Payments**: Automated payment release upon project verification
- **Global Marketplace**: Connect worldwide without intermediaries
- **Project Management**: Track projects from creation to completion
- **Web3 Integration**: MetaMask wallet connection
- **Dual Interface**: Separate dashboards for employers and freelancers

## How It Works

1. **Create Project**: Employers post projects with requirements and escrow funds
2. **Select Project**: Freelancers browse and select projects matching their skills
3. **Complete Work**: Freelancers deliver work and mark projects as done
4. **Get Paid**: Employers verify work and funds are automatically released

## Project Status Flow

- **Open**: Project is available for freelancers to select
- **Not Done**: Project has been selected by a freelancer and is in progress
- **Done**: Freelancer has completed and submitted the work
- **Close**: Employer has verified the work and payment has been released

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum, Smart Contracts (Solidity)
- **Web3**: MetaMask integration
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Ethereum wallet with test ETH

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Blockchain Setup (For Production)

To deploy to actual blockchain:

1. Install Truffle globally:
   ```bash
   npm install -g truffle
   ```

2. Install Ganache CLI for local blockchain:
   ```bash
   npm install -g ganache-cli
   ```

3. Start Ganache:
   ```bash
   ganache-cli
   ```

4. Compile and deploy contracts:
   ```bash
   truffle compile
   truffle migrate --reset
   ```

5. Run tests:
   ```bash
   truffle test
   ```

## Smart Contract Features

- **Escrow System**: Employer funds are held in the contract until work is verified
- **Status Management**: Automatic status updates based on project lifecycle
- **Payment Release**: Automated payment to freelancer upon employer verification
- **Transparent History**: All transactions recorded on blockchain

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask wallet
2. **Choose Role**: Select between "Employer" or "Freelancer" mode
3. **For Employers**:
   - Create projects with name, description, and price
   - Track project progress
   - Verify completed work and release payments
4. **For Freelancers**:
   - Browse available projects
   - Select projects to work on
   - Submit completed work
   - Receive payments automatically

## Security Features

- Smart contract escrow ensures payment security
- Immutable transaction history on blockchain
- No single point of failure
- Transparent fee structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Deployment

The application can be deployed to:
- Netlify (for frontend)
- Ethereum Mainnet (for smart contracts)
- IPFS (for decentralized hosting)

## Support
Check out my repositories, projects, and contributions at my GitHub profile:
https://github.com/Ketan-cmd
For support and questions, please open an issue in the repository or contact the development team.
