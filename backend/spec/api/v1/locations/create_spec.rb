require 'rails_helper'

RSpec.describe "locations#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/v1/locations", payload
  end

  describe 'basic create' do
    let(:params) do
      attributes_for(:location)
    end
    let(:payload) do
      {
        data: {
          type: 'locations',
          attributes: params
        }
      }
    end

    it 'works' do
      expect(LocationResource).to receive(:build).and_call_original
      expect {
        make_request
        expect(response.status).to eq(201), response.body
      }.to change { Location.count }.by(1)
    end
  end
end
