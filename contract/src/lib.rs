#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct LocalDAO;

#[contractimpl]
impl LocalDAO {
    pub fn create_proposal(env: Env, title: Symbol) {
        let key = title.clone();
        let mut count: u32 = env.storage().instance().get(&key).unwrap_or(0);
        count += 1;
        env.storage().instance().set(&key, &count);
    }
}
